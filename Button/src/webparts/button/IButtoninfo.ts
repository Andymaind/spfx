export interface IButtonInfo {
    url: string;
    //img: string;
    Titulo: string;
    Color: string;
    target: LinkTarget;
    ColorTxt: string
  }
  
  export enum LinkTarget {
    parent = '',
    blank = '_blank'
  }