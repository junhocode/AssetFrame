import { describe, expect, it } from '@jest/globals';
import { parseWsKlineToRaw } from '@/utils/klineParser';

describe('parseWsKlineToRaw', () => {
  it('parses WS data into kline format', () => {
    const mockWsKline = {
      t: 1700000000000, 
      T: 1700000059999,
      s: "BTCUSDT",     
      i: "1m",         
      f: 100,          
      L: 200,           
      o: "50000.00",    
      c: "50500.00",    
      h: "51000.00",   
      l: "49000.00",    
      v: "10.5",       
      n: 100,           
      x: false,         
      q: "500000.00",   
      V: "5.0",        
      Q: "250000.00",  
      B: "0"            
    };

    const result = parseWsKlineToRaw(mockWsKline as any);

    expect(result).toHaveLength(12);

    expect(result[0]).toBe(1700000000000);
    expect(result[1]).toBe("50000.00");    
    expect(result[2]).toBe("51000.00");    
    expect(result[3]).toBe("49000.00");    
    expect(result[4]).toBe("50500.00");    
    expect(result[5]).toBe("10.5");      
    expect(result[6]).toBe(1700000059999);
    expect(result[7]).toBe("500000.00");   
    expect(result[8]).toBe(100);           

    expect(result[9]).toBe("0");
    expect(result[10]).toBe("0");
    expect(result[11]).toBe("0");
  });
});