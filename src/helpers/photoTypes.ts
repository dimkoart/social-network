export type Photo = {
  image: string;
  size: number;
  filter: string
}

export enum PhotoFilter {
  none = 'None',
  moon = 'Moon',
  amaro = 'Amaro',
  nashville = 'Nashville',  
  clarendon = 'Clarendon'
}


