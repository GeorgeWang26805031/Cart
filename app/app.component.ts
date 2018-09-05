import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cart: FormGroup;
  memorylist = ([[
    {
      id: 1,
      prodName: 'hihi',
      prodPrice: 20,
      prodAmount: 34,
      prodTotal: 20 * 34
    }, {
      id: 2,
      prodName: 'qqqq',
      prodPrice: 20,
      prodAmount: 34,
      prodTotal: 20 * 34
    }
  ]]);
  i = 2;
  num = 1;
  index = 3;
  memorycellist: Array<any>;
  displayedColumns = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6'];
  title = 'cart';
  prodname: string;
  prodprice = 0;
  prodamount = 0;
  prodtotal: number;
  isclear = false;
  object = new Object();
  total = 680 + 680;
  dataSource = new MatTableDataSource<cartModel>(
    [{
      id: 1,
      prodName: 'hihi',
      prodPrice: 20,
      prodAmount: 34,
      prodTotal: 20 * 34
    }, {
      id: 2,
      prodName: 'qqqq',
      prodPrice: 20,
      prodAmount: 34,
      prodTotal: 20 * 34
    }]);
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formbuilder: FormBuilder,
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
    this.cart = this.formbuilder.group({
      prodname: '',
      prodprice: 0,
      prodamount: 0,
    });
    console.log(this.memorylist);


  }
  recovery() {
    if (this.memorylist.length - this.i >= 0) {
      console.log(this.memorylist[this.num - this.i]);
      this.dataSource.data = this.memorylist[this.memorylist.length - this.i];
      this.dataSource._updateChangeSubscription();
      // this.memorylist.splice(this.memorylist.length - 1, 1);
      this.i++;
    } else {
      this.i = 2;
      this.memorylist = ([[
        {
          id: 1,
          prodName: 'hihi',
          prodPrice: 20,
          prodAmount: 34,
          prodTotal: 20 * 34
        }, {
          id: 2,
          prodName: 'qqqq',
          prodPrice: 20,
          prodAmount: 34,
          prodTotal: 20 * 34
        }
      ]]);
    }

  }
  Changes(dataSource: MatTableDataSource<cartModel>) {
    // tslint:disable-next-line:prefer-const
    let memory = [];
    if (dataSource) {

      for (let i = 0; i < this.dataSource.data.length; i++) {
        // tslint:disable-next-line:prefer-const
        let cell = dataSource.data[i];
        // tslint:disable-next-line:prefer-const
        let memorycell = {
          id: cell.id,
          prodName: cell.prodName,
          prodPrice: cell.prodPrice,
          prodAmount: cell.prodAmount,
          prodTotal: cell.prodTotal
        };
        console.log(memorycell);
        memory.push(memorycell);
        console.log(memory);

      }
      this.memorylist.push(memory);
      console.log(this.memorylist);
    } else {
      // this.object = Object.assign(this.object, <cartModel>{});
      // this.memorylist[this.num].push(this.object);
    }

    this.num++;
    let sum = 0;
    dataSource.data.forEach(function (element) {
      sum += element.prodTotal;
    });
    this.total = sum;
    console.log(this.total);

  }
  // console.log(this.memorylist);

  deletedata(i: number) {
    this.dataSource.data.splice(i, 1);
    this.dataSource = new MatTableDataSource<cartModel>(this.dataSource.data);
    this.Changes(this.dataSource);
  }

  submit() {


    const record: cartModel = {
      id: this.index,
      prodName: this.cart.value.prodname,
      prodPrice: this.cart.value.prodprice,
      prodAmount: this.cart.value.prodamount,
      prodTotal: this.cart.value.prodprice * this.cart.value.prodamount
    };
    this.dataSource.data.push(record);
    this.Changes(this.dataSource);
    this.dataSource._updateChangeSubscription();
    console.log(this.dataSource.data);
    this.cart.patchValue({
      prodname: '',
      prodprice: 0,
      prodamount: 0
    });
    this.index++;
  }
  clearAll() {
    this.dataSource = new MatTableDataSource<cartModel>([
    ]);
    console.log(this.dataSource);
    this.Changes(this.dataSource);
    this.dataSource._updateChangeSubscription();
  }
  getprodtotal() {
    this.prodtotal = this.prodamount * this.prodprice;
  }
}


// tslint:disable-next-line:class-name
export interface cartModel {
  id: number;
  prodName: string;
  prodPrice: number;
  prodAmount: number;
  prodTotal: number;
  // constructor(model?) {
  //   model = model || {
  //   };
  //   this.id = model.id || null;
  //   this.prodName = model.prodName || null;
  //   this.prodPrice = model.prodPrice || null;
  //   this.prodAmount = model.prodAmount || null;
  //   this.prodTotal = model.prodTotal || null;
  // }
}


