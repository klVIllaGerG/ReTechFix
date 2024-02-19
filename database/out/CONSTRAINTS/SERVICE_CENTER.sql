--------------------------------------------------------
--  Constraints for Table SERVICE_CENTER
--------------------------------------------------------

  ALTER TABLE "JAY"."SERVICE_CENTER" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB"  ENABLE;
  ALTER TABLE "JAY"."SERVICE_CENTER" MODIFY ("TEL" NOT NULL ENABLE);
  ALTER TABLE "JAY"."SERVICE_CENTER" MODIFY ("LOC_DETAIL" NOT NULL ENABLE);
  ALTER TABLE "JAY"."SERVICE_CENTER" MODIFY ("NAME" NOT NULL ENABLE);