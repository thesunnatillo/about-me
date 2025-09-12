export interface ICreatePostReq {
    title: string;
    article: string;
};

export interface IUpdatePostReq extends ICreatePostReq {
    id: number;
};

export interface IGetPostRes {
    id: number;
    title: string;
    article: string;
    createdAt: string;
}