import S from 'fluent-schema'
import { allEnumValues } from 'dinastry/commons/allEnumValues';
import { 
  Pendidikan, 
  Pekerjaan, 
  KepT, 
  KepR, 
  KepKM, 
  KondAtap, 
  KondLantai, 
  KondDinding, 
  SumAir, 
  SumListrik 
} from "dinastry/types";

export const RawDataSchema = S.object()
.prop('nama', S.string().minLength(5).maxLength(40).required())
.prop('umur', S.integer().minimum(0).maximum(150))
.prop('pendidikan', S.enum(allEnumValues(Pendidikan)))
.prop('pekerjaan', S.enum(allEnumValues(Pekerjaan)))
.prop('kepT', S.enum(allEnumValues(KepT)))
.prop('kepR', S.enum(allEnumValues(KepR)))
.prop('kepRM', S.enum(allEnumValues(KepKM)))
.prop('kondAtap', S.enum(allEnumValues(KondAtap)))
.prop('kondLantai', S.enum(allEnumValues(KondLantai)))
.prop('kondDinding', S.enum(allEnumValues(KondDinding)))
.prop('sumAir', S.enum(allEnumValues(SumAir)))
.prop('sumListrik', S.enum(allEnumValues(SumListrik)));