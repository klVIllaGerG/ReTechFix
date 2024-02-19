--------------------------------------------------------
--  Constraints for Table COUPON
--------------------------------------------------------

  ALTER TABLE "JAY"."COUPON" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB"  ENABLE;
  ALTER TABLE "JAY"."COUPON" ADD CHECK (status in (0,1)) ENABLE;
  ALTER TABLE "JAY"."COUPON" ADD CHECK (discount > 0) ENABLE;
  ALTER TABLE "JAY"."COUPON" ADD CHECK (type in (0,1,2)) ENABLE;
