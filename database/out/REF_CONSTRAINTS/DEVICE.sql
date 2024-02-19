--------------------------------------------------------
--  Ref Constraints for Table DEVICE
--------------------------------------------------------

  ALTER TABLE "JAY"."DEVICE" ADD FOREIGN KEY ("DEVICE_CATE_ID")
	  REFERENCES "JAY"."DEVICE_CATE" ("CATEGORYID") ON DELETE SET NULL ENABLE;
  ALTER TABLE "JAY"."DEVICE" ADD FOREIGN KEY ("DEVICE_TYPE_ID")
	  REFERENCES "JAY"."DEVICE_TYPE" ("TYPEID") ON DELETE SET NULL ENABLE;
