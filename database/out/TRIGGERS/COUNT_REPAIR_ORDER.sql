--------------------------------------------------------
--  DDL for Trigger COUNT_REPAIR_ORDER
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_REPAIR_ORDER" 
after insert on repair_order
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'REPAIR_ORDER';
  end;
/
ALTER TRIGGER "JAY"."COUNT_REPAIR_ORDER" ENABLE;
