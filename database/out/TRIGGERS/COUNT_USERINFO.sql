--------------------------------------------------------
--  DDL for Trigger COUNT_USERINFO
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "JAY"."COUNT_USERINFO" 
after insert on userinfo
for each row
  begin
    update COUNTER 
    set TABLECOUNT = TABLECOUNT+1
    where TABLENAME = 'USERINFO';
  end;
/
ALTER TRIGGER "JAY"."COUNT_USERINFO" ENABLE;
