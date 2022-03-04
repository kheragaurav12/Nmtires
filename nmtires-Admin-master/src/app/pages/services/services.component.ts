import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Tires } from "src/app/classes/tires";
import * as util from "./../../utils";
import firebase from "firebase/app";
import { combineLatest, Subscription } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StatsService } from "src/app/services/stats.service";
import { Category } from "src/app/classes/category";
import * as XSLX from "xlsx";
import * as FileSaver from 'file-saver';

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {

  tireForm: FormGroup;
  today: Date = new Date();
  monthlyId: string;

  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;
  tempImageFiles: any[] = [];

  tireModel: Tires;
  tiresList: Tires[] = [];
  categories: Category[] = [];

  docLimit: number = 50;
  lastDocs: any;

  imageUrl: string;

  subjectSub: Subscription;

  loader: boolean = false;
  updation: boolean = false;
  showLoadMore: boolean = false;
  serviceDetailCardBool: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dbRef: AngularFirestore,
    private stgRef: AngularFireStorage,
    private toast: ToastrService,
    private data: DataService,
    private statsService: StatsService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage

  ) { }

  ngOnInit(): void {
    this.monthlyId = formatDate(this.today, "yyyyMM", "en-us");
    this.data.getCategories();
    this.data.getProducts();

    this.subjectSub = combineLatest([this.data.productCategorySub, this.data.productSub])
      .subscribe(([categories, products]) => {
        if (categories.length != 0) this.categories = categories;
        if (products.length < this.docLimit) {
          this.showLoadMore = false;
        } else {
          this.showLoadMore = true;
        }

        if (products.length != 0) {
          this.tiresList = products;
        }
      });
  }

  exportServices() {
    const workSheet: XSLX.WorkSheet = XSLX.utils.json_to_sheet(this.tiresList.map((service) => ({
      "Tire Name": service.title,
      "Tire Description": service.description,
      "Created On": service.createdOn.toDate().toLocaleString()
    })));
    const workbook: XSLX.WorkBook = { Sheets: { 'services': workSheet }, SheetNames: ['services'] };
    const excelBuffer: any = XSLX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, 'Services.xlsx')
  }

  async loadMoreServiceServices() {
    if (this.lastDocs == undefined) {
      this.data.productLastDocs.subscribe(res => {
        if (res != null) {
          this.lastDocs = res;
        }
      });
    }
    this.dbRef.collection(util.PRODUCTS_COLLECTION, (ref) =>
      ref
        .orderBy("createdOn", "desc")
        .startAfter(this.lastDocs)
        .limit(this.data.docLimit)
    )
      .get().toPromise()
      .then((response) => {
        if (response.docs.length < this.docLimit) {
          this.showLoadMore = false;
        } else {
          this.showLoadMore = true;
        }

        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let cusObj: Tires = Object.assign({}, ele.data() as Tires);
            this.lastDocs = ele;
            this.tiresList.push(cusObj);
            this.data.productLastDocs.next(ele);
          });
          this.data.productSub.next(this.tiresList);
        } else {
          this.toast.info('No More Records', '');
        }
      });
  }

  viewServiceDetails(modal, tireModel: Tires) {
    this.tireModel = tireModel;
    this.modalService.open(modal, { size: 'sm' });
  }

  openModal(modal, customer: Tires = null) {
    this.tempImageFiles = [];
    this.initialiseModal(customer);
    this.modalService.open(modal, { size: "xl" });
  }

  openImageModal(modal, imageUrls: string[], thumbnailImageIdx) {
    this.tempImageFiles = [...imageUrls];
    this.thumbnailImageIdx = thumbnailImageIdx;
    this.modalService.open(modal, {
      size: "xl",
      scrollable: true
    });
  }

  openDeleteModal(modal, customer: Tires) {
    this.modalService.open(modal, { size: "sm" });
    this.tireModel = customer;
  }

  initialiseModal(tireObj: Tires) {
    if (tireObj == null) {
      this.updation = false;
      this.tireForm = this.fb.group({
        tireId: [this.dbRef.createId()],
        title: [null],
        imageUrls: this.fb.array([]),
        thumbnailImage: [0],
        description: [null],
        category: [null],
        size: this.fb.group({
          diameter: [null],
          width: [null],
          rim: [null]
        }),
        brand: [null],
        model: [null],
        yearForm: [null],
        yearTo: [null],
        price: [null],
        active: [true],
        showOnHomePage: [false],
        createdOn: [firebase.firestore.Timestamp.now()],
      });
    } else {
      this.updation = true;
      this.tireForm = this.fb.group({
        tireId: [tireObj.tireId],
        title: [tireObj.title],
        imageUrls: [tireObj.imageUrls],
        thumbnailImage: [tireObj.thumbnailImage || 0],
        description: [tireObj.description],
        category: [tireObj.category],
        size: this.fb.group({
          diameter: [tireObj.size.diameter],
          width: [tireObj.size.width],
          rim: [tireObj.size.rim]
        }),
        brand: [tireObj.brand],
        model: [tireObj.model],
        yearForm: [tireObj.yearForm],
        yearTo: [tireObj.yearTo],
        price: [tireObj.price],
        active: [tireObj.active],
        showOnHomePage: [tireObj.showOnHomePage],
        createdOn: [tireObj.createdOn],
      });
      this.onSelectOption(tireObj.category);
      this.tempImageFiles = tireObj.imageUrls || [];
    }
  }

  onSelectOption(category: Category) {
    this.tireForm.patchValue({
      category: this.categories.find(x => x.categoryId === category.categoryId)
    })
  }

  compareByCategoryId(category1: Category, category2: Category) {
    return category1 && category2 && category1.categoryId === category2.categoryId;
  }

  checkImageFileType(files) {
    let fileList: File[] = Object.assign([], files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        this.toast.warning("Only .png/.jpeg/.jpg file format accepted!!", file.name + " will not accepted.");
      }
    });
  }

  removeImage(idx) {
    this.tempImageFiles.splice(idx, 1);
  }

  getFileNameFromFirebaseDownloadedUrl(url: string) {
    return this.stgRef.storage.refFromURL(url).name;
  }

  changeThumbnailImageIdx(idx) {
    this.tireForm.patchValue({
      thumbnailImage: idx
    })
  }

  async uploadImages(tireId) {
    let imageDownloadedUrl: string[] = [];
    for await (let file of this.tempImageFiles) {
      if (file instanceof File) {
        const FilePath = "tire-images/" + tireId + "/" + file.name;
        const FileRef = this.stgRef.ref(FilePath);
        await this.stgRef.upload(FilePath, file);
        imageDownloadedUrl.push(await FileRef.getDownloadURL().toPromise());
      } else {
        imageDownloadedUrl.push(file);
      }
    }
    return imageDownloadedUrl;
  }

  async registeredService(form: FormGroup) {
    this.loader = true;
    let tireObj: Tires = { ...form.value };
    tireObj.imageUrls = await this.uploadImages(tireObj.tireId);

    this.dbRef
      .collection(util.PRODUCTS_COLLECTION)
      .doc(tireObj.tireId)
      .set(tireObj, { merge: true })
      .then(
        () => {
          this.loader = false;
          if (this.updation) {
            let index = this.tiresList.findIndex(
              (x) => x.tireId == tireObj.tireId
            );
            this.tiresList[index] = { ...tireObj };
            this.toast.show("Tire Updated Successfully");
          } else {
            this.tiresList.splice(0, 0, tireObj);
            this.toast.show("Tire Added Successfully", "");
            this.statsService.maintainGlobalStats(util.PRODUCTS_COLLECTION, true)
          }

          this.updation = false;
          delete this.tempImageFiles;
          this.modalService.dismissAll();
        },
        (error) => {
          // console.log(">>> Error", error);
          this.loader = false;
          this.toast.warning("Something went wrong!! Please Try Again");
        }
      );
  }

  async deleteService() {
    this.dbRef
      .collection(util.PRODUCTS_COLLECTION)
      .doc(this.tireModel.tireId)
      .delete()
      .then(
        () => {
          let index = this.tiresList.findIndex(
            (x) => x.tireId == this.tireModel.tireId
          );
          this.tiresList.splice(index, 1);
          this.modalService.dismissAll();
          this.toast.show("Tire Deleted Successfully");
          this.statsService.maintainGlobalStats(util.PRODUCTS_COLLECTION, false)
        },
        (error) => {
          // console.log(">>> Error", error);
          this.loader = false;
          this.toast.warning("Something went wrong!! Please Try Again");
        }
      );
  }

  openImage(url) {
    window.open(url, "_blank")
  }
}
