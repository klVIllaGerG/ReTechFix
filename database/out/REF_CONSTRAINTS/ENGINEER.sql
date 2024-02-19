--------------------------------------------------------
--  Ref Constraints for Table ENGINEER
--------------------------------------------------------

  ALTER TABLE "JAY"."ENGINEER" ADD FOREIGN KEY ("WORK_CENTER")
	  REFERENCES "JAY"."SERVICE_CENTER" ("ID") ENABLE;
