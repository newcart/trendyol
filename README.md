## Trendyol

Pazaryeri modüllerinde
* app.module.ts dosyasında modül için gerekli temel yapılandırmalar yapılır. import edilecek hizmetler ayarlanır
* app.controller.ts dosyasında gateway den gelen istekler karşılanır ve bu istekler servise yönlendirilir
* @param body post işlemi ile gönderilen json datasına karşılık gelmektedir. HTTP Body dir

Her pazaryeri için üç servis olacak. Bu servisler isteklerin işlendiği yerdir. bu servis içinde ayrıca dto ve eventslar kullanılabilir.
* a. productService ürün işlemleri
* b. orderService sipariş işlemleri
* c. appService diğer işlemler

Tüm pazaryerleri servisleri aynı isimde metodlara sahiptir. hepsine aynı yapıda json ile istek göndeirilir. ve aynı yapıda geri dönüş alınır
## appService Metodları
```
testAccount: Api hesabını test etmek için
getMainCategories: Kök Kategori listesini almak için
getCategories: Kategori listesini almak için
getCategory: Bir kategorinin bilgilerini almak için
getCategorySpecs: Kategoride kullanılabilecek specsler için
getCategorySpecValues: Kategoride tanımlı Specslerin değerleri için 
```
## productService Metodları
```
getProducts: Ürünleri pazaryerinden okumak için
getProduct: Tek bir ürünü pazaryerinden okumak için
postProduct: Pazaryerine ürün kaydetmek için
putProduct: Pazaryerinde ürün güncellemek için HTTP PUT metodu
putProductPrice: Pazaryerinde ürün fiyatı güncellemek için HTTP PUT metodu
putProductStock: Pazaryerinde ürün adedi güncellemek için HTTP PUT metodu
```
## orderService Metodları
```
getOrders: Siparişleri pazaryerinden okumak için
getOrder: Tek bir siparişi pazaryerinden okumak için
```
