export interface Film {
    _id: string;
    slikaPutanja: string;
    naziv: string;
    reziser: string; //moze i array[string]
    datum: Date;
    zanrovi: string[]; //promeni kasnije
    opis: string;
    prosek: number;
    odobren: boolean;
}