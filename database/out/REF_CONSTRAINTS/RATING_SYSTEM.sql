--------------------------------------------------------
--  Ref Constraints for Table RATING_SYSTEM
--------------------------------------------------------

  ALTER TABLE "JAY"."RATING_SYSTEM" ADD FOREIGN KEY ("USERID")
	  REFERENCES "JAY"."USERINFO" ("ID") ENABLE;
  ALTER TABLE "JAY"."RATING_SYSTEM" ADD FOREIGN KEY ("ENGINEERID")
	  REFERENCES "JAY"."ENGINEER" ("ID") ENABLE;
