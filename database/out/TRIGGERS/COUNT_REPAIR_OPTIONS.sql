--------------------------------------------------------
--  DDL for Trigger COUNT_REPAIR_OPTIONS
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_REPAIR_OPTIONS" 
after insert on repair_option
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'REPAIR_OPTIONS';
  end;
/
ALTER TRIGGER "JAY"."COUNT_REPAIR_OPTIONS" ENABLE;
