const users = [
  {
    ci: "12121212",
    extension: "LP",
    cm: "1234342",
    grado: "Cnl.",
    especialidad: "DIM",
    nombre: "Juan Ivan",
    apellidoPaterno: "Arias",
    apellidoMaterno: "Choque",
    correo: "jarias@gmail.com",
    inSystemPermission: "Sí",
    rol: "Administrador",
    estado: "Activo",
  },
  // {
  //   ci: "D5Nw3Lo8mSB1kHuHOQAFCL/UNe8DINIAVqcWQWfZ/l2He+S+/xVaxhzewEjDruxmwzPM2FSHONlv8emRjTh+dtALtoD2RcXJrlNojcjr0b1fgYioX0q4pctiWlD7yNyjxJFCGZ8GWmLDG/HcqJVHFuWN1gu+yJIKPCPY0fjQayp+/9TDABLPNoSMT4vwEZlA4ocDw83cQZMW6BEqDRRE9yraHwAjpPP8B+sx279F7+WKjQU70FuqAAwW/FiL6dGG7kUjW16FEiAs4CbA2fIX4OQjkcSh8usfEY7cxnNY7ENmnpJxautbdn3yBuAQcIs5ONSlpE/ytPlO9vVI1lYoiA==",
  //   extension: "fMqFbY1OFP0LNlC3vX3Enup9dbrF/xqckQfdE+n/tyv/PR2t3VRftUfYXotJSSakJJJ8Gk1pHRS7UJm68m97lXGT9OIGymGyeF48mB1oeU2UJYq5hK0d+pun9HPQgJBsX2Dx8KqCkMkzvZ/frxD7pTqaa4HIM4/0NdKbfu8TZWi6q8QuhKltqSlt9TbFMkuOmB9XXJK6b7S6CNYrPFLSNgHigSTp3u0sqVii7LYdek9OKLhjFUn9pz0TA6Hd1u9jet9OPq8KSR0hPWZ/JYZRQyMaowYeFzMx1MYSjPBVh77k024kitmnhuayQCkB/V6xactEUaBnZLyNCGjG04KnEA==",
  //   cm: "XHfOfC+EWk0poJOMs7ZjnWAlpfWHVS267gGY42M8YhJp7WV3um21chvTJ3ZtW6A9YiCOycKIeeWZS+r4AHpPliucV+gB0AWIIHdKaiLGclGvXy3bwTbDcpN8xGngWHyF12ocIMxfWF7jRO25JvEOMCFcjlD/3kjCPU7seA5n8oZP4MCnrxp4UwK7TeGkfCEDKg5U5Th5zFrq2mssGOoUf6CzhxT9YMA750MNHnfhaz/MnMF6AYMDLbA0YUhBtrw5rYc1hdEtrQZtF84lVHEz0gLs5YD4u7RqLiG53A2dqDz5x77mhVFA6JyndY7J14h0geWCdThpPKeb104U5E4S0A==",
  //   grado: "W+sIwqBo2+k3LEnT95p7olY7/8LIcE9FcnlrZp1HmQSR6cRJqhFbg7v2MQVhvMLnIc1czspx/DC69YqTLn5qnK6YXVnswlW4b6ctV7ReOvdXdW9HWrx+5dEQQVPqvSMOZdNIPQC3L4s3nQJC7vamyC+evOpAvBrpQxVRDzF3yJpp45xe1ITfKOsC8wpbbECV+gxhMbD2RabgsdHh5yvnjecMg+lKkcf048kR6OSDEDP8HnKcxHof+ldH01qy4XpHHe/h5Sm8oz+/jqE2xP7tYPGdl0yx9pv7GDqHMrmG7CsitaefOedxfhjT3x5+Z5Wb4rrSrwN8I2CpISK1cpIAfw==",
  //   especialidad: "Fub/8iNlHYEhN3ksS+zzNFRGfUWGWiOXpaExZehaKpEtMuxqBeF7otML+LRSsetDKaPowHjEoFRUq99dzs2pwIj5wCBSlU8Jd8vV/+BykcPT3At5t/QHk+DZlQyFt9mWy/SOZBDOaAl7hP52HN9r3BHdyk2sr7aO3SK0hovTlD1cyLUIvWvnfOr5/PkuK6vuerrHwNbSIrH8wV5rGmh/XctmkbwdEUxq9Rs5/pRLGI/ZfhusOjWewglmp+k+djvOF6HN3hb/wABnVxokMUDgkjyKxyAL0F72g27ZOSDWk4ox2UzPrLzReVKeH8Tn0mVsQCcuYdlE8jIFxxktMl+a2Q==",
  //   nombre: "dTWo5a0OWEKeArjBFvN5WFBAs+y5bGUHiNEFCloeu/75cGiYdWxc9JLXFl5S/sv1NKwJvFaYhKTVovZaVt4XLmQWGHOt+zguCw4MHD+a41wpwQPQYKtSHqDSLcpwSCxw3dPtIqmMYSupDtG/oALWY2S24/r2QRQJDHeRg4U0EssxVIjkjlVM4SqxLss1ifa4ZIraNUkZWnyQVfkP7TBaTO2awQe2IenpBFKkC+NBsAJg1B/cSSHrfqn43en2QyDqbwwkoYZHYxQzdP4PIdkX1B2uWVRUMextTE9eUCVAB3YUkuqKmMpgKsFELyOZJIAKATvu5QGyz+wHNDXFuZZesg==",
  //   apellidoPaterno: "aaBt17L47E/V3OY0QBs0llGhlPolevPEgM8T23EiRMJET/3bkDfM4D4JS6SZXtJ1rltI1SDOiJ8e9i2F+nycEoafrMYEx8U7AcGz7ZLHB3dC4XsDIz7Grtp2uI2ldh0ku1v8yan14FEZSgEkfFmDwraVTHZAH0H6MIwlEJoTwPGtVKyCRU0bbK/9H07+OE1beY4dbNoE01qIvVEu8EDVGfzXyBRlF2hSTlF667Tg3mwXuN5agUTZD/qsjCn3WcRk9/VzF7OVmj3BChjIv4egX/WwzsjJEfZhLP2xGon/p3/00nwPDkwgu/CWthmK89q5uuIE67uTthtJLdtGjAFKmA==",
  //   apellidoMaterno: "Cinmh4Sa8XnXLHSLTXs1QIET3gtGdnKYSBBAZ/QeEt7IsPGJoT3vdG8gGkYSA4oAoPFKaf4JIZ+7wiiVKPdJY7OkyHFsHgO3L+4Ma77BLHFCQTo1dIZPznmX5eOpgN2NwsoruuEBgn+Q6J4QS5PpkfqpRO/gvswYh88Q2FRDN3feK5ra+F/6DSnzkeFJMbRDCBY2SzFMes3rKKKz2+TOfXaRG219XFGXLcuR2DDhrrG6Asu93ZWzMLl7pw0pHQ7sCHzC8nDrBTeIHm00/JPwjHSTtWzuWNrMjihwsi4x9IlOL6JH9ryfjOPnWfvwrX2T0Ih2BLowpEpOk9ULAIDVJw==",
  //   correo: "LF9sZz9xEqidOEn6BAwp96iaCM1irpPI/7bMu+2B7PLMGzGxzDu55F3sH+eo+rJOssVML7OikuAoQbKvIlmwq+5jVjAV3Uj3JesE0gFjOcG+fDT4VPWmJQTUXrTMnlVMvsMunA55lvBbxOAWJUJjpJbGPIlAB0kr/vRIS6uZCgNc/flgu2Q5vqJf+UghrwUhrE8DhxTeaXTyQcJv4T0MltLNu54tw++JFdo6XF9jwCQbvjHN/F1YNzb0iOcMqScFGSz7tT2pugGTEYgB542aALQ+7hYJTF310koTf+6MFIZ+GjiLqt0dkyXJNwCYfoXxlaI+N2GCxbyI1R3KhnmEHA==",
  //   inSystemPermission: "NII+N+i/AFMUJn5UQ1GG2KeC16dRRrwa/egMxUkerleGI0u9ZzQ3hDkeoSqX7X5e7GXhOycO6wDR/6CNsUj7cmHdLrnRdQfLefIGUS8gfX3qQa1PEQaXLzag7EBdyU0peLU5cztS6nte5+7fQLUjaX3YoqH8WC9dyGxTkW5Ec3jRdnhJXZjOt3iVN/XoJpr7Kzstl0D86ouOZdIoxOXpLl6StrDvKBtdhWGAfnRU7ppES8xrsK+qxhQENksTAZn0RMFpl/w8rxZjn19twWwEPLWgJuAoKbR3LzxXBEEmM14CHKq/bcG8eSS/D9hyrZ1KbcSdLJWfSZDxKvpifHJQFw==",
  //   rol: "dpLpiT9bHX6wJRx8bUd9RxXLD7DeAz1qDuzInDp8CYWC2NgxLUjjdAT02YrOdAvU1Ima0PnN9sbEcWmnTi8gIp47Bf8F6g1uQi8zVGbeNdEjYaRd9IC2TrelKeWO0EnMwf1y7edhVvEXbpAZm8QQfoEF3pmxG674cFUnHUd51uLYrYs69XtLWt97ZbkBeRkp3vBqEC9bYsriT3dvtapUYctlGpNxxL10dbmYLQOPtk43GV9U0U5rAU5mnho9aJ5HSITMK5YCJHPFVKwTRvyySKUecW87/aphemhHKXCDdrS7oftpxk3+9MAlxUVFpBbUCEvq0rH1PAgi2h+cwimj1Q==",
  //   estado: "KsEI3oZLa9XcW3rEt1y3iMHZzwkKDeYTqVmmbMTgLU7nyBnsObSOmYayGRGT3wYYQ3A05wvQ0QmaYMk0fYZwifOxiiv98L92+LFjilJ+fWny4g9Ny0xguz221mgwNzs5VKC+OReevYlTq8Dx6d0rZwCYnAdudcRvVfTBf6i7nTqZkrZ8P/RHkzDIhYSHAoT/XsG5riTRGcXPorXsTQCIBQD40W5eySnOlsTUKWd8vAPTzZ80Iy1q/j0pxA/h0t7CGxf7pa92w3VRzzvx4lqBS0dOE43/1A99mTL0tnDoJrKOqcqwme/GjzjSdQWlzzQjDobCvcDZvtH7CLrIWcN/dw=="
  // }
];

const weapons = [
  {
    codigo: "0000000123",
    nroarma: "0000000123",
    estado: "B/E",
    observations: "Regular, estado operable (prestado Bimi curosos catos catim), no hay actas de entrega y recepción",
    propietario: "Departamento VI",
    armamento: "Fusil Galil",
    modelo: "AR",
    calibre: "5.56 x 45 mm",
    industria: "Israel",
    inInventory: "Si",
    clasification: "Organico",
  },

];

export { users, weapons };
