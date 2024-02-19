--------------------------------------------------------
--  DDL for Trigger COUNT_RECYCLE_ORDER
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_RECYCLE_ORDER" 
after insert on recycle_order
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'RECYCLE_ORDER';
  end;
/
ALTER TRIGGER "JAY"."COUNT_RECYCLE_ORDER" ENABLE;
