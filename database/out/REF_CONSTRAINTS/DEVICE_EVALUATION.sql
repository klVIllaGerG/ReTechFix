--------------------------------------------------------
--  Ref Constraints for Table DEVICE_EVALUATION
--------------------------------------------------------

  ALTER TABLE "JAY"."DEVICE_EVALUATION" ADD FOREIGN KEY ("DEVICEID")
	  REFERENCES "JAY"."DEVICE" ("DEVICEID") ON DELETE SET NULL ENABLE;
