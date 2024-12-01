<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0" >
<xsl:template match="/">
<html>
    <body>
        <p>
            <strong>Уважаемый поставщик, добрый день!</strong>
        </p>
        <div>Направляем Вам запрос по заявке №<xsl:value-of select="MT/App/AppNumber"/>.</div>
        <div>Просьба выставить Счет/Приложение в форме, согласованной в договоре.</div>
        <div>
            Требуемая дата поставки

            <!-- Преобразование даты из ISO в формат 'yyyy-mm-dd' -->
            <!-- Почему-то не сработал format-date для преобразования в 'dd.mm-yyyy' :/ -->
            <xsl:variable name="DeliveryDateTime" select="MT/ADO/DeliveryDate"/>
            <xsl:variable name="DeliveryDate" select="substring-before($DeliveryDateTime, 'T')"/>
            <xsl:value-of select="$DeliveryDate"/>
            <!-- <xsl:variable name="DeliveryDateFormatted" select="format-date(xs:date($DeliveryDate), '[M01].[D01].[Y0001]')"/> -->
            <!-- <xsl:value-of select="$DeliveryDateFormatted"/> -->

        </div>
        <br />
        <div>С уважением ответственный сотрудник</div>
        <div>
            <xsl:value-of select="MT/Emp/FamIO"/> (<xsl:value-of select="MT/Emp/Mail"/>)
        </div>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>
