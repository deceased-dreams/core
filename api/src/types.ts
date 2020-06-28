import { ObjectID } from "mongodb";

export enum Pendidikan {
  TidakSekolah = "tidak_sekolah",
  SD = "sd",
  SMP = "smp",
  SMA = "sma",
  D3 = "d3",
  D4 = "d4",
  S1 = "s1",
  S2 = "s2",
  S3 = "s3"
}

export enum Pekerjaan {
  PNS = "pns",
  Pensiunan = "pensiunan",
  Swasta = "swasta",
  Buruh = "buruh",
  Petani = "petani"
}

export enum KepT {
  Sendiri = 'sendiri',
  OrangLain = 'orang lain'
}

export enum KepR {
  Sendiri = 'sendiri',
  OrangLain = 'orang lain'
}

export enum KepKM {
  Sendiri = 'sendiri',
  OrangLain = 'orang lain'
}

export enum KondAtap {
  Seng = 'seng',
  Alang = 'alang',
  DaunGewang = 'daun gewang'
}

export enum KondDinding {
  Tembok = 'tembok',
  Bebak = 'bebak'
}

export enum KondLantai {
  Keramik = 'keramik',
  Lantai = 'lantai',
  Tanah = 'tanah'
}

export enum SumAir {
  PDAM = 'pdam',
  Sumur = 'sumur'
}

export enum SumListrik {
  Ada = 'ada',
  TidakAda = 'tidak ada'
}

export interface RawData {
  nama: string;
  pendidikan: Pendidikan;
  pekerjaan: Pekerjaan;
  penghasilan: number;
  jumlahPenghuni: number;
  kepT: KepT;
  kepR: KepR;
  kepKM: KepKM;
  kondAtap: KondAtap;
  kondDinding: KondDinding;
  kondLantai: KondLantai;
  sumAir: SumAir;
  sumListrik: SumListrik;
}

export interface PenerimaBantuan extends RawData {
  id?: ObjectID;
}

export interface RawUser {
  username: string;
  password: string;
}

export interface User extends RawUser {
  id?: ObjectID;
}
