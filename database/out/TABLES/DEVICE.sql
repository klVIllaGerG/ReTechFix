--------------------------------------------------------
--  DDL for Table DEVICE
--------------------------------------------------------

  CREATE TABLE "JAY"."DEVICE" 
   (	"DEVICEID" VARCHAR2(10 BYTE), 
	"DEVICE_CATE_ID" VARCHAR2(10 BYTE), 
	"DEVICE_TYPE_ID" VARCHAR2(20 BYTE), 
	"PURCHASE_CHANNEL" VARCHAR2(30 BYTE) DEFAULT 'null', 
	"STORAGE_CAPACITY" VARCHAR2(30 BYTE) DEFAULT 'null'
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB" ;
