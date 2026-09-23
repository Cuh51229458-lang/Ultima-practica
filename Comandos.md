 Invoke-RestMethod `                                                
>>   -Uri "http://localhost:5000/" `
>>   -Method POST `
>>   -ContentType "application/json" `
>>   -Body $body

 $body = @{ titulo = "Segunda Prueba" } | ConvertTo-Json     

Invoke-RestMethod ` -Uri "http://localhost:5000/" ` -Method GET  
