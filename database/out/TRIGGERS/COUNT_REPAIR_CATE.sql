--------------------------------------------------------
--  DDL for Trigger COUNT_REPAIR_CATE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_REPAIR_CATE" 
after insert on repair_cate
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'REPAIR_CATE';
  end;
/
ALTER TRIGGER "JAY"."COUNT_REPAIR_CATE" ENABLE;
