--------------------------------------------------------
--  DDL for Table CREDIT_CARD
--------------------------------------------------------

  CREATE TABLE "JAY"."CREDIT_CARD" 
   (	"CARDID" VARCHAR2(30 BYTE), 
	"USERID" VARCHAR2(10 BYTE), 
	"BANK" VARCHAR2(50 BYTE), 
	"ISDEFAULT" NUMBER(1,0) DEFAULT 0, 
	"BALANCE" NUMBER(12,2) DEFAULT 10000
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB" ;
