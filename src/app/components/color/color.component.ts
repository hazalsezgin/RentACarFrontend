import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[]
  currentColor:Color;
  allColor:Color;
  @Output() colorId = new EventEmitter<string>();

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    console.log("silme burda yazı kalsın")
    this.getColors(); 
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
  })
}
  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  allColorSelected(){
    return this.currentColor == undefined ? true : false;
  }

} 
