--------------------------------------------------------
--  DDL for Trigger COUNT_DEVICE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_DEVICE" 
after insert on device
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'DEVICE';
  end;
/
ALTER TRIGGER "JAY"."COUNT_DEVICE" ENABLE;
