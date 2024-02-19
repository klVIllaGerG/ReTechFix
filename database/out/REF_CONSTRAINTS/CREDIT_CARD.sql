--------------------------------------------------------
--  Ref Constraints for Table CREDIT_CARD
--------------------------------------------------------

  ALTER TABLE "JAY"."CREDIT_CARD" ADD CONSTRAINT "FK_UID" FOREIGN KEY ("USERID")
	  REFERENCES "JAY"."USERINFO" ("ID") ENABLE;
