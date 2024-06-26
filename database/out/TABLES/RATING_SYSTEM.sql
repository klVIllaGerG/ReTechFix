--------------------------------------------------------
--  DDL for Table RATING_SYSTEM
--------------------------------------------------------

  CREATE TABLE "JAY"."RATING_SYSTEM" 
   (	"USERID" VARCHAR2(10 BYTE), 
	"ENGINEERID" VARCHAR2(10 BYTE), 
	"RATE" NUMBER(*,0), 
	"USER_COMMENT" VARCHAR2(200 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "TJ_DB" ;
