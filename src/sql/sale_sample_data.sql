
USE integrador;

-- sample data

call sales_pending_new(5,3,'conbin',4,'',25);
call sales_pending_new(4,3,'conbin',4,'',25);
call sales_pending_new(2,1,'conbin',1,'',0);
call sales_pending_new(1,1,'conbin',2,'',50);

call sale_confirm_payment(1,'PAYPAL');
