(function () {
  'use strict';

  var ProductService = function ($http) { /*реализуем конструктор функцию, просим внедрить http-сервис, $http сервис -
    это стандартный сервис в ангуляре, который позволяет делать http-запросы. Позволяет тестировать.*/
    // Instance attributes go here:
    this.$http = $http; /*Тот сервис, который ангуляр нам сюда передает, мы публикуем его публикуем в каччестве инстанс
    поля в наш ProductService. Мы это делаем не для того чтобы расшарить, а чтобы использовать внутри наших инстанс
    методов*/
  };

  /** List all dependencies required by the service. Определяем все сервисы которые мы хотим внедрить */
  ProductService.$inject = ['$http'];

  // Instance methods go here: Начинаем определять наши инстанс методы:
  ProductService.prototype = { //инстанс методы мы определяем на прототайп свойстве конструктор функции

    /** Returns the list of all available products on the server. */
    getProducts: function () { //getProducts - имя которое мы задаем для метода, а дальше идет реализация
      return this.$http.get('/data/products-featured.json')/* здесь, внутри функции function, объявленной выше, можем
      получить доступ к экземпляру нашего ProductService. Если бы мы не опубликовали $http сервис (строчка this.$http = $http;
      на экземпляр нашего ProductService мы бы никак не смогли дотянуться до переменной var ProductService. Т.е. выше
      мы опубликовали $http сервиc, а здесь мы его вызываем. У $http сервиса есть метод .get, который позволяет по
      заданному адресу сделать http get запрос */
          .then(function (resp) { return resp.data; }); /*в тот момент когда асинхронный запрос завершится ответ resp
          будет передан в качестве объекта в callback функцию, т.е. передаем данные тому методу который вызвал getProducts
         */
    },

    /** Finds products with specified criteria.
      * NOTE: Search criteria are not implemented yet.
      */
    find: function () { //здес все происходит по аналогии с getProducts
      return this.$http.get('/data/products-search.json')
          .then(function (resp) { return resp.data; });
    }
  };

  // Register the service within AngularJS DI container. Регистрируем наш сервис внутри модуля
  angular.module('auction').service('ProductService', ProductService);
}());
