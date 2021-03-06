import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {
  VillageNameService,
  Village,
  TableData,
  VillageNameDisplay,
} from '../services/village-name.service';
import {SingleVillageSearchResultService,} from '../services/single-village-search-result.service';
import {StateServiceService} from '../services/state-service.service';

@Component({
  selector: 'app-single-village-search-v2',
  templateUrl: './single-village-search-v2.component.html',
  styleUrls: ['./single-village-search-v2.component.css']
})
export class SingleVillageSearchV2Component implements OnInit {

  myControl = new FormControl();

  options: Village[] = [];
  filteredOptions: Village[] = [];
  temp: VillageNameDisplay;

  choose: Village;

  searchResult: TableData[];
  display: boolean = false;

  selectedTable: any = [];


  constructor(private villageNameService: VillageNameService,
              private villageSearchResultService: SingleVillageSearchResultService,
              private stateService: StateServiceService,
              private router: Router) {

  }

  ngOnInit(): void{
    this.init();
  }

  async init(){
    this.temp = await this.villageNameService.getVillages();
    this.filteredOptions =  this.temp.data;
    this.options = this.filteredOptions;
    console.log("this.filteredOptions",this.filteredOptions);
  }

  async filter(value: string) {
    if(value === ""){
      await this.init();
    }
    else{
      const filterValue = value;
      console.log('filterValue', filterValue);
      this.temp = await this.villageNameService.filterVillages(value);
      console.log("this.temp",this.temp);
      this.filteredOptions =  this.temp.data;
      //this.filteredOptions = this.options.filter(option => option.name.includes(filterValue));
    }

  }

  displayFn(village): string{
    return village ? village.name : '';
  }

  async search(choose: Village): Promise<void>{
    console.log("choose ", choose);
    this.searchResult = (await this.villageSearchResultService.searchEncap(choose)).tables;
    console.log("this is the searchResult", this.searchResult);

    this.display = true;

    // router go to single-village-search-result page
    this.stateService.data = this.searchResult;
    this.router.navigate(['/single-village-search-result']);
  }

  onSelect(table: TableData) {
    this.selectedTable = table;
    console.log("selected table: ",this.selectedTable);
  }

  async goToComponentB(): Promise<void> {

  }


}
