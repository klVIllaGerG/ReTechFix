--------------------------------------------------------
--  Ref Constraints for Table NEWS_SYSTEM
--------------------------------------------------------

  ALTER TABLE "JAY"."NEWS_SYSTEM" ADD FOREIGN KEY ("USERID")
	  REFERENCES "JAY"."USERINFO" ("ID") ENABLE;
