--------------------------------------------------------
--  Ref Constraints for Table SERVICE_LOC
--------------------------------------------------------

  ALTER TABLE "JAY"."SERVICE_LOC" ADD FOREIGN KEY ("CUSTOMERID")
	  REFERENCES "JAY"."USERINFO" ("ID") ON DELETE SET NULL ENABLE;
