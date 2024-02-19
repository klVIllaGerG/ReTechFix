--------------------------------------------------------
--  Ref Constraints for Table REPAIR_OPTION
--------------------------------------------------------

  ALTER TABLE "JAY"."REPAIR_OPTION" ADD FOREIGN KEY ("REPAIRCATEGORYID")
	  REFERENCES "JAY"."REPAIR_CATE" ("ID") ENABLE;
