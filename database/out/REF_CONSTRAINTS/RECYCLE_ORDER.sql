--------------------------------------------------------
--  Ref Constraints for Table RECYCLE_ORDER
--------------------------------------------------------

  ALTER TABLE "JAY"."RECYCLE_ORDER" ADD FOREIGN KEY ("DEVICEID")
	  REFERENCES "JAY"."DEVICE" ("DEVICEID") ENABLE;
  ALTER TABLE "JAY"."RECYCLE_ORDER" ADD FOREIGN KEY ("USERID")
	  REFERENCES "JAY"."USERINFO" ("ID") ENABLE;
