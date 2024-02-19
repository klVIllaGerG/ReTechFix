--------------------------------------------------------
--  DDL for Table SERVICE_CENTER
--------------------------------------------------------

  CREATE TABLE "JAY"."SERVICE_CENTER" 
   (	"ID" VARCHAR2(10 BYTE), 
	"NAME" VARCHAR2(100 BYTE), 
	"LOC_DETAIL" VARCHAR2(200 BYTE), 
	"TEL" VARCHAR2(20 BYTE), 
	"TIMG_URL" VARCHAR2(200 BYTE), 
	"LATITUDE" NUMBER(8,4) DEFAULT null, 
	"LONGITUDE" NUMBER(8,4) DEFAULT null
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB" ;
