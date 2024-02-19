--------------------------------------------------------
--  DDL for Table CUSTOMER_SERVICE
--------------------------------------------------------

  CREATE TABLE "JAY"."CUSTOMER_SERVICE" 
   (	"ID" VARCHAR2(10 BYTE), 
	"QUESTION" VARCHAR2(50 BYTE), 
	"ANSWER" VARCHAR2(400 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB" ;
