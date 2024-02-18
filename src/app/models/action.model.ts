export interface ActionModel{


  actionId:string,
  description:string,
  isDone:boolean,
  index:number

}

export interface Response {

    status: number,
    title: any,
    errorStatus: any,
    success: boolean,
    message: string,
    data: ActionModel []

}

