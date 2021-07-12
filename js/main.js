window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	//инициализация баннера слайдера на ГЛАВНОЙ странице
		const mainBannerSlider = new Swiper('.main-banner-slider', {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
			// If we need pagination
			pagination: {
			el: '.swiper-pagination',
			},
		
			// Navigation arrows
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			},
			
		});

	//инициализация баннера слайдера на странице О НАС
		const aboutBannerSlider = new Swiper('.about-banner-slider', {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
				},
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				// Буллеты
				clickable: true,
				// Динамические буллеты
				// dynamicBullets: true,
			},
			
			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			
			});

	// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА С товаром
	  	if(document.querySelector('.products-slider__container')) {

			let productSlider = new Swiper('.products-slider__container', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 4,
	
			
				// Navigation arrows
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				
			}); 
			
		  }

	// HEADER
		if(document.querySelector('.header')) {

			// ДЛЯ ДЕСКТОП
				let header = document.querySelector('.header');//header
				let headerBottomListItem = document.querySelectorAll('.js_header_bottom_list_item');//меню в header
				let headerDropdownMenu = document.querySelector('.js_header_dropdown_menu');//выпадающее меню

			// ДЛЯ МОБИЛКИ
				let headerMobileButtonMenu = document.querySelector('.js_header_bottom_button_menu');//бургер на мобилке
				let headerDropdownMenuList = document.querySelectorAll('.js_header_dropdown_menu_list');//подменю выпадающие списки 
				let headerDropdownMenuMobileLink = document.querySelector('.header-dropdown-menu__mobile-link');//заголовок ГЛАВНАЯ
				let headerDropdownMenuMobileTitle = document.querySelectorAll('.header-dropdown-menu__list-title');//заголовки меню мобилка
				let headerDropdownMenuMobileListItem = document.querySelectorAll('.header-dropdown-menu__mobile-list-item');//пункты горизонтального меню
				let headerClose = document.querySelector('.js_header_dropdown_menu_close');//кнопка закрыть Х
				
				// проверяет ширину при загрузке страницы
				menuDropDown();

				// проверяет ширину при изменении ширины экрна
				window.addEventListener('resize', () => {
					menuDropDown();
				});

			// ФУНК-ИЯ ПРОВЕРЯЕТ ШИРИНУ ЭКРАНА
				function menuDropDown() {
					if(window.innerWidth > 1200) {

						// показывает меню при наведении на заголовки гориз. меню
						headerBottomListItem.forEach(elem => {							
							
							if(elem.classList.contains('salons')) {
								elem.addEventListener('mouseover', (e) => {
									e.stopPropagation();
								});
							} else {
								elem.addEventListener('mouseover', () => {
									headerDropdownMenu.classList.remove('active');
									headerDropdownMenu.classList.add('active');
									bodyFixPosition();
								});
							}

						});

						//закрыть меню при выходе курсора из него
						headerDropdownMenu.addEventListener('mouseleave', () => {
							headerDropdownMenu.classList.remove('active');
							bodyUnfixPosition();
						});
					} else {
						// ПРИ КЛИКЕ НА БУРГЕР
						headerMobileButtonMenu.addEventListener('click', () => {
							headerDropdownMenu.classList.add('active');
							bodyFixPosition();
						});

						headerDropdownMenuMobileLink.addEventListener('click', () => {
							headerDropdownMenu.classList.remove('active');
							bodyUnfixPosition();
						});

						// ПРИ КЛИКЕ НА ЗАГОЛОВОК С ВЫПАДАЮЩИМ МЕНЮ ПОКАЗЫВАЕТ СПИСОК


						headerDropdownMenuMobileTitle.forEach(elem => {
							elem.addEventListener('click', () => {
								// headerDropdownMenuList.forEach(elem => {
								// 	elem.classList.remove('active');
								// });

								elem.parentNode.classList.toggle('active');
								
								
								
								
							});
						});

						//ПРИ КЛИКЕ НА ПУНКТЫ ГОРИЗОНТАЛЬНОГО МЕНЮ
						headerDropdownMenuMobileListItem.forEach(elem => {
							elem.addEventListener('click', () => {
								headerDropdownMenuMobileListItem.forEach(elem => {
									elem.classList.remove('active');
								});
								elem.classList.add('active');
							});
						});
					}
				}

			//ЗАКРЫТЬ МЕНЮ ДЛЯ МОБИЛКИ
				headerClose.addEventListener('click', () => {
					headerDropdownMenu.classList.remove('active');
					headerDropdownMenuList.forEach(elem => {
						elem.classList.remove('active');
					});
					bodyUnfixPosition();
				});

			// ОТКРЫТЬ POPUP КОРЗИНА
				let headerTopUserBasket = document.querySelector('.js_header_top_user_basket');//иконка корзины в header
				let headerTopUserBasketPopup = document.querySelector('.js_header_top_user_basket_popup');//popup корзина
				let body = document.querySelector('body');//body
			
			// при клике на иконку корзины открывать попап
				
				body.addEventListener('click', () => {
					if(headerTopUserBasketPopup.classList.contains('active')) {
						headerTopUserBasketPopup.classList.remove('active');
						// console.log('body');
					}
				});

				headerTopUserBasket.addEventListener('click', (e) => {
					e.stopPropagation();
					headerTopUserBasketPopup.classList.toggle('active');
					// console.log('busket');
				});

				headerTopUserBasketPopup.addEventListener('click', (e) => {
					e.stopPropagation();
				});



			//ПРОВЕРКА ПРИ КЛИКЕ НА ПОИСК в Desktop
				let headerBottomSearchInput = document.querySelector('.js_header_bottom_search_input');//input поиска в header
				let headerBottomSearchButton = document.querySelector('.js_header_bottom_search_button');//кнопка поиска в header

			// при клике на иконку поиска идет проверка и если больше 3-х символов, то переход на страницу поиска
				headerBottomSearchButton.addEventListener('click', () => {
					checkHeaderSerch();
				});
				
			// ф-ия проверки текста в строке поиска
			function checkHeaderSerch() {
				if(headerBottomSearchInput.value.length < 3) {
					
					headerBottomSearchInput.value = 'Введите минимум 3 символа';
					headerBottomSearchInput.onfocus = () => {
						headerBottomSearchInput.value = '';
					};
				} else {
					document.location.href = "page-search.html";
				}
			};

			//ПОИСК НА mobile
				let headerBottomButtonSearchMobile = document.querySelector('.js_header_bottom_button_search_mobile');//кнопка вызова поиска в мобилке
				let headerSearchMobilePopup = document.querySelector('.js_header_search_mobile_popup');//весь popup всплывающего окна поиска.
				let headerSearchMobileInput = document.querySelector('.js_header_search_mobile_input');//input в мобилке
				let headerSearchMobileButton = document.querySelector('.js_header_search_mobile_button');//кнопка НАЙТИ в мобилке
			
			// открытие поиска в мобилке
				headerBottomButtonSearchMobile.addEventListener('click', () => {
					headerSearchMobilePopup.classList.toggle('active');
				});

			// при клике "найти" на мобилке
				headerSearchMobileButton.addEventListener('click', () => {
					if(headerSearchMobileInput.value.length < 3) {
						headerSearchMobileInput.value = 'Введите минимум 3 символа';
						headerSearchMobileInput.onfocus = () => {
							headerSearchMobileInput.value = '';
						};
					} else {
						headerSearchMobileInput.value = '';
						headerSearchMobilePopup.classList.remove('active');
						document.location.href = "page-search.html";
					}
				});

			//открытие popup ВЫРБРАТЬ ГОРОД
				let headerTopRegionCity = document.querySelectorAll('.js_header_top_region_city');//название города в header'e
				let popupTakeCity = document.querySelector('.js_popup_take_city');//popup ВЫБОРА ГОРОДА
				let popupTakeCityTitleArrow = document.querySelector('.js_popup_take_city_title_arrow')//стрелка назад
				let popupTakeCityListItem = document.querySelectorAll('.js_popup_take_city_list_item');//название города

				//при клике на город в header'e открывает попап выбора города
					headerTopRegionCity.forEach(elem => {
						elem.addEventListener('click', () => {
							popupTakeCity.classList.add('active');
							bodyFixPosition();
						});
					});

					

				//при клике на название города закрывает попап + в header меняется название
					popupTakeCityListItem.forEach(elem => {
						elem.addEventListener('click', () => {

							if(window.innerWidth > 1200) {
								headerTopRegionCity[0].textContent = elem.textContent;
								popupTakeCity.classList.remove('active');
								bodyUnfixPosition();
							} else {
								headerTopRegionCity[1].textContent = elem.textContent;
								popupTakeCity.classList.remove('active');
								bodyUnfixPosition();
							}
							
						});
					});

				//при клике на стрелку назад, закрывает попап выбора города					
					popupTakeCityTitleArrow.addEventListener('click', () => {
						popupTakeCity.classList.remove('active');
						bodyUnfixPosition();
					});
		}
	
	//	FOOTER
		if(document.querySelector('.footer')) {

			let footerButtonsTopScroll = document.querySelector('.js_footer_buttons_top_scroll');//кнопка вверх в правом углу footer

			footerButtonsTopScroll.addEventListener('click', () => {

				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});

			});

		} 

	//сердечко на странице 
		if(document.querySelector('.js_product_item_content_heart')) {

			// ПРИ КЛИКЕ НА СЕРДЕЧКИ ОНИ СТАНОВЯТСЯ АКТИВНЫМИ
			let productItemContentHeart = document.querySelectorAll('.js_product_item_content_heart');

			productItemContentHeart.forEach(elem => {
				elem.addEventListener('click', () => {
					elem.classList.toggle('active');
				});
			});

		}

	// страница КАТАЛОГ
		if(document.querySelector('.catalog')) {
			
			// верхний слайдер с типом 
			let catalogSliderTop = new Swiper('.catalog-slider-top__container', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 'auto',
				// slidesPerView: 'auto',
				spaceBetween: 40,

				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
				
			});

			// сделать активным слайд при выборе типа
			let catalogSliderTopSlide = document.querySelectorAll('.js_catalog_slider_top_slide');//слайды в слайдере с типом
			
			catalogSliderTopSlide.forEach(elem => {
				elem.addEventListener('click', () => {
					catalogSliderTopSlide.forEach(elem => {
						elem.classList.remove('active');
					});
					elem.classList.add('active');
				});
			});

			//слайдер с фильтром товаров
			let catalogSliderFilter = new Swiper('.catalog-content-slider-filter', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 'auto',
				spaceBetween: 15,

				// Navigation arrows
				navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				},
				
			});

			//делает активным слайд на который кликнули
			let catalogSliderFilterSlide = document.querySelectorAll('.catalog-content-slider-filter .swiper-slide')//слайды
			
			catalogSliderFilterSlide.forEach(elem => {
				elem.addEventListener('click', () => {
					catalogSliderFilterSlide.forEach(elem => {
						elem.classList.remove('active');
					});
					elem.classList.add('active');
				});
			});

			//слайдер ХИТ ПРОДАЖ для больших карточек
			let catalogSliderHitsBig = new Swiper('.catalog-content-big__hits-slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 2,
				// spaceBetween: 50,
				breakpoints: {
					// when window width is >= 320px
					320: {
						slidesPerView: 1,
						// spaceBetween: 20
					},
					
					// when window width is >= 640px
					650: {
						slidesPerView: 2,
						spaceBetween: 40
					}
				},

				// Navigation arrows
				navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				},
				
			});

			//слайдер ХИТ ПРОДАЖ для маленьких карточек
			let catalogSliderHitsLittle = new Swiper('.catalog-content-little__hits-slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 3,
				// spaceBetween: 50,
				breakpoints: {
					// when window width is >= 320px
					320: {
						slidesPerView: 1,
						spaceBetween: 20
					},

					420: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					
					// when window width is >= 640px
					760: {
						slidesPerView: 3,
						spaceBetween: 20
					}
				},

				// Navigation arrows
				navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				},
				
			});

			// открытие подпунктов в левом меню
			let catalogContentListItem = document.querySelectorAll('.js_catalog_content_list_item');//пункт меню

			// при клике открывает подменю
				catalogContentListItem.forEach(elem => {
					elem.addEventListener('click', () => {						
						elem.classList.toggle('active');

						let catalogContentListSubtitle = elem.querySelector('.catalog-content-list__subtitle');
						catalogContentListSubtitle.addEventListener('click', (e) => {
							e.stopPropagation();
						});
					});
				});



			//переключение страницы с большими/маленькими карточками
				let iconCatalogContentControlSwitchingLittle = document.querySelector('.js_catalog_content_control_switching_little');//иконка с маленькими карточками
				let iconCatalogContentControlSwitchingBig = document.querySelector('.js_catalog_content_control_switching_big');//карточка с большими иконками
				let catalogContentLittle = document.querySelector('.js_catalog_content_little');//страница с маленькми иконками
				let catalogContentBig = document.querySelector('.js_catalog_content_big');//страница с большими иконками

				iconCatalogContentControlSwitchingLittle.addEventListener('click', () => {
					catalogContentBig.classList.remove('active');
					catalogContentLittle.classList.add('active');
				});
				iconCatalogContentControlSwitchingBig.addEventListener('click', () => {
					catalogContentLittle.classList.remove('active');
					catalogContentBig.classList.add('active');
					
				});

			//переключение страницы с большими/маленькими карточками для mobile
				let catalogMobileCategory = document.querySelector('.js_catalog_mobile_category');//кнопка переключения для мобильных

				catalogMobileCategory.addEventListener('click', () => {
					
					if(catalogContentLittle.classList.contains('active')) {
						catalogContentLittle.classList.remove('active');
						catalogContentBig.classList.add('active');
					} else {
						catalogContentBig.classList.remove('active');
						catalogContentLittle.classList.add('active');
						
					}

				});

			//DROPDOWN открытие/закрытие
				let catalogContentControlDropdown = document.querySelector('.js_catalog_content_control_dropdown');//dropdown
				let catalogContentControlDropdownTitle = document.querySelector('.js_catalog_content_control_dropdown_title'); //заголовок у dropdown
				let catalogContentControlDropdownListItem = document.querySelectorAll('.js_catalog_content_control_dropdown_list-item');//пункты меню 
	
				// открывает закрывает dropdown при коике на заголовок dropdownа
				catalogContentControlDropdownTitle.addEventListener('click', () => {
					catalogContentControlDropdown.classList.toggle('active');
				});

				// при клике на пункт дропдауна
				catalogContentControlDropdownListItem.forEach(elem => {
					elem.addEventListener('click', () => {
						let contentTitleDropdown = catalogContentControlDropdownTitle.textContent;//текст в заголовке
						elem.textContent
						catalogContentControlDropdownTitle.textContent = elem.textContent;
						elem.textContent = contentTitleDropdown;
						catalogContentControlDropdown.classList.remove('active');
						
					});
				});

			//при клике на ПОКАЗАТЬ ЕЩЕ
				let catalogPaginationPageMore = document.querySelector('.js_catalog_pagination_page_more');//кнопка показать еще

				// при клике не кнопку показать еще 
				catalogPaginationPageMore.addEventListener('click', () => {
					//скрывает кнопку
					catalogPaginationPageMore.classList.add('hide');

					// показать еще карточки
					
				});
			



		}

	// страница КАРТОЧКА ТОВАРА
		if(document.querySelector('.product')) {

			// инициализация слайдера с миниатюрами
				var productSliderThumbs = new Swiper('.product-slider-thumbs', {
					direction: 'horizontal',
					spaceBetween: 5,
					slidesPerView: 4,
					freeMode: true,
					pagination: {
						el: '.swiper-pagination',
					},
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					freeMode: true,
					breakpoints: {
						1200: {
							spaceBetween: 0,
							direction: 'vertical',
							
						}
					}

				});
				
			// инициализация основоного слайдера с картинками
				let productSliderTop = new Swiper('.product-slider-top', {
					spaceBetween: 85,
					loop: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
					},
					thumbs: {
						swiper: productSliderThumbs
					}
					
				});


			// при клике на сердечко меняется цвет
				let productDescrHeart = document.querySelector('.product-descr__heart');

				productDescrHeart.addEventListener('click', () => {
					productDescrHeart.classList.toggle('active');
				});

			// выбор размера
				let productDescrSizeItem = document.querySelectorAll('.js_product_descr_size_item.product-descr__size-present');//размер

				productDescrSizeItem.forEach(elem => {
					elem.addEventListener('click', () => {
						productDescrSizeItem.forEach(elem => {								
							elem.classList.remove('active');							
						});
						elem.classList.add('active');
					});
					
				});

			// открыть попап ОСТАВЬТЕ ПОЧТУ
				let productDescrSizeAbsent = document.querySelectorAll('.js_product_descr_size_item.product-descr__size-absent')//отсутствующий размер
				let productDescrSizePopup = document.querySelector('.js_product_descr_size_popup');//popup
				let productDescrSizePopupClose = document.querySelector('.js_product_descr_size_popup_close');//закрыть попап Х
				let productDescrSizePopupInput = document.querySelector('.js_product_descr_size_popup-input');//input
				let productDescrSizePopupButtton = document.querySelector('.js_product_descr_size_popup_buttton');//кнопка Отправить
				
				productDescrSizeAbsent.forEach(elem => {
					elem.addEventListener('click', () => {
						productDescrSizePopup.classList.toggle('active');
					});
				});

				productDescrSizePopupButtton.addEventListener('click', () => {
					productDescrSizePopup.classList.remove('active');
					productDescrSizePopupInput.value = "";
				});

				productDescrSizePopupClose.addEventListener('click', () => {
					productDescrSizePopup.classList.remove('active');
					productDescrSizePopupInput.value = "";
				});

			//при клике на кнопку ПОКАЗАТЬ БОЛЬШЕ
				let productAboutButtonShow = document.querySelector('.js_product_about_button');//кнопка показать еще
				let productAbout = document.querySelector('.js_product_about');//блок с текстом			
				productAboutButtonShow.addEventListener('click', () => {
					productAbout.classList.toggle('show');
					productAboutButtonShow.classList.toggle('show');
				});

			//при клике на кнопку ПРИМЕРИТЬ ОНЛАЙН
				let productSliderButton = document.querySelector('.js_product_slider_button');//кнопка ПРИМЕРИТЬ ОНЛАЙН
				let productPopupVideo = document.querySelector('.js_product_popup_video');//попап видео

				// открытие popup ПРИМЕРИТЬ ОНЛАЙН
				productSliderButton.addEventListener('click', () => {
					productPopupVideo.classList.add('active');
					bodyFixPosition();
				});

			//при клике на кнопку ДОБАВИТЬ В КОРЗИНУ
				let productDescrButtonAdd = document.querySelector('.js_product_descr_button_add');//кнопка ДОБАВИТЬ В КОРЗИНУ
				let popupProductAdd = document.querySelector('.js_popup_product_add');//popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
				let popupChoiceSize = document.querySelector('.js_popup_choice_size');//popup ВЫБОР РАЗМЕРА  
				
				//открытие popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
				productDescrButtonAdd.addEventListener('click', () => {

					let activeSize = 0;

					productDescrSizeItem.forEach(elem => {
						if(elem.classList.contains('active')) {
							activeSize = activeSize + 1;
						}						
					});

					//если не выбран размер, то открывается попап выбора размера
					if(activeSize == 1) {
						popupProductAdd.classList.add('active');
						bodyFixPosition();
					} else {
						popupChoiceSize.classList.add('active');
						bodyFixPosition();
					}
				});

			//при клике на кнопку ЗАБРАТЬ В МАГАЗИНЕ
				let productDescrButtonPickip = document.querySelector('.js_product_descr_button_pickip');//кнопка ЗАБРАТЬ В МАГАЗИНЕ
				let productPopupMagazine = document.querySelector('.js_product_popup_magazine');//popup ВЫБОР  МАГАЗИНА

				// открыть popup ВЫБОР МАГАЗИНА
				productDescrButtonPickip.addEventListener('click', () => {
					productPopupMagazine.classList.add('active');
					bodyFixPosition()
				});				

			//POPUP ТАБЛИЦА РАЗМЕРОВ
				let productDescrManual = document.querySelector('.js_product_descr_manual');//кнопка РУКОВОДСТВО ПО РАЗМЕРАМ
				let productPopupSize = document.querySelector('.js_product_popup_size');//popup ТАБЛИЦА РАЗМЕРОВ

				// открыть popup
				productDescrManual.addEventListener('click', () => {
					productPopupSize.classList.add('active');
					bodyFixPosition();
				});

		}

	// страница КОРЗИНА
		if(document.querySelector('.basket')) {

			// скрыть строчку с товаром при клике на Х
			let basketCntProduct = document.querySelectorAll('.js_basket_cnt_product');//строка с товаром

			basketCntProduct.forEach(elem => {
				
				// закрыть при клике на Х
				let basketCntProductClose = elem.querySelector('.js_basket_cnt_product_close');//кнопка закрыть Х
				basketCntProductClose.addEventListener('click', () => {
					elem.classList.add('hidden');
				});

				// изменить количество при клике на +/-
				let basketCntProductPriceQuantityNumber = elem.querySelector('.js_basket_cnt_product_price_quantity_number');//число с количеством
				let basketCntProductPriceQuantityPlus = elem.querySelector('.js_basket_cnt_product_price_quantity_plus');//кнопка +
				let basketCntProductPriceQuantityMinus = elem.querySelector('.js_basket_cnt_product_price_quantity_minus');//кнопка -

				basketCntProductPriceQuantityPlus.addEventListener('click', () => {
					// увеличивает количество на 1
					basketCntProductPriceQuantityNumber.textContent = Number(basketCntProductPriceQuantityNumber.textContent) + 1;
				});

				basketCntProductPriceQuantityMinus.addEventListener('click', () => {

					// уменьшает количество на 1
					if (Number(basketCntProductPriceQuantityNumber.textContent) > 0) {
						basketCntProductPriceQuantityNumber.textContent = Number(basketCntProductPriceQuantityNumber.textContent) - 1;
					}
					
				});

				//активное сердечко
				let basketCntProductDescrTextHeart = elem.querySelector('.js_basket_cnt_product_descr_text_heart');//сердечко

				basketCntProductDescrTextHeart.addEventListener('click', () => {
					basketCntProductDescrTextHeart.classList.toggle('active');
				});

			});	
			
			// когда страница скролл доходит до footer'a фиксированный блок поднимать.
			
			let basketCnt = document.querySelector('.basket');
			let basketRigistration = document.querySelector('.js_basket_rigistration');//блок с регистрацией

			menuDropDown();

			//проверяет ширину экрана
			function menuDropDown() {
				if(window.innerWidth > 1200) {

					// когда скролл до footer'a, блок с регистрацией перестает быть фиксированным
					window.addEventListener('scroll', () => {
						// console.log(window.pageYOffset);

						if(window.pageYOffset > (basketCnt.clientHeight - 600)) {
							
							basketRigistration.classList.add('none-fixed');
						} else {
							basketRigistration.classList.remove('none-fixed');
						}
					});
					
				} else {
					basketRigistration.classList.remove('none-fixed');
				}
			}

			

		}

	// страница ЛИЧНЫЙ КАБИНЕТ	
		if(document.querySelector('.cabinet')) {

			// переключение между пунктами личного кабинета
			let cabinetNavigationListItem = document.querySelectorAll('.js_cabinet_navigation_list_item');// пункты в навигаторе каталог
			
			let cabinetContent = document.querySelectorAll('.js_cabinet_content');// блоки с контентом
	
			cabinetNavigationListItem.forEach(elem => {
				elem.addEventListener('click', () => {
					cabinetNavigationListItem.forEach(elem => {
						elem.classList.remove('active');
					});
					elem.classList.add('active');

					cabinetContent.forEach(elem => {
						elem.classList.remove('active');
					});

					cabinetContent[Number(elem.dataset.index)].classList.add('active');

				
				});
			});

			//открыть popup ДОБАВИТЬ АДРЕС
			let cabinetPersonalAddAddressButton = document.querySelector('.js_cabinet_personal_add_address_button');//кнопка добавить адрес
			let popupAddAddress = document.querySelector('.js_popup_add_address');//popup ДОБАВИТЬ АДРЕС
			
			cabinetPersonalAddAddressButton.addEventListener('click', () => {
				popupAddAddress.classList.add('active');
				bodyFixPosition();
			});

			//блок МОИ ЗАКАЗЫ
				//для DESKTOP
				let cabinetContentOrderCnt = document.querySelectorAll('.js_cabinet_content_order_cnt');//обертка для блока с заказом.
				let cabinetContentOrderButton = document.querySelectorAll('.js_cabinet_content_order_button');//кнопка ПОДРОБНЕЕ

				//расскрывает/скрывает описание заказа при клоике на ПОДРОБНЕЕ
				cabinetContentOrderButton.forEach((elem, index) => {
					
					elem.addEventListener('click', () => {
						cabinetContentOrderCnt[index].classList.toggle('active');
						cabinetContentOrderCntMobile[index].classList.toggle('active');
					});

				});

				//для MOBILE
				let cabinetContentOrderCntMobile = document.querySelectorAll('.js_cabinet_content_order_cnt_mobile');//блок с заказом для mobile
				let cabinetContentOrderCntMobileButton = document.querySelectorAll('.js_cabinet_content_order__cnt_mobile_button');//кнопки ПОДРОБНЕЕ


				cabinetContentOrderCntMobileButton.forEach((elem, index) => {

					elem.addEventListener('click', () => {
						cabinetContentOrderCntMobile[index].classList.toggle('active');
						cabinetContentOrderCnt[index].classList.toggle('active');
					});

				});

				

			


		}

	// страница БРЕНДЫ
		if(document.querySelector('.brands')) {

			// инициализация слайдера баннера
			let brandsBannerSlider = new Swiper('.brands-banner-slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				speed: 500,
				autoplay: {
					delay: 7000,
					disableOnInteraction: false,
				  },

				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
				
			});

			// инициализация слайдеров с названием бренда
			let brandsSliderFirst = new Swiper('.brands-cnt__slider.first-slider', {
				// Optional parameters
				direction: 'horizontal',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },
				
				
			});

			let brandsSliderTwo = new Swiper('.brands-cnt__slider.two-slider', {
				// Optional parameters
				direction: 'vertical',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },

				
			});

			let brandsSliderThree = new Swiper('.brands-cnt__slider.three-slider', {
				// Optional parameters
				direction: 'horizontal',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },

				
			});

			let brandsSliderFour = new Swiper('.brands-cnt__slider.four-slider', {
				// Optional parameters
				direction: 'horizontal',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 10000,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },

			});

			let brandsSliderFive = new Swiper('.brands-cnt__slider.five-slider', {
				// Optional parameters
				direction: 'horizontal',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 5700,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },

			});

			let brandsSliderSix = new Swiper('.brands-cnt__slider.six-slider', {
				// Optional parameters
				direction: 'vertical',
				effect: 'cube',
				loop: true,
				speed: 600,
				// grabCursor: true,
				autoplay: {
					delay: 9000,
					disableOnInteraction: false,
				  },
				cubeEffect: {
					shadow: false,
					slideShadows: true,
					shadowOffset: 10,
					shadowScale: 0.94,
				  },

			});

			//открыть popup ВСЕ БРЕНДЫ
			let brandsCntButton = document.querySelector('.js_brands_cnt_button');//кнопка ПОКАЗАТЬ ВСЕ БРЕНДЫ
			let popupAllBrands = document.querySelector('.js_popup_all_brands');//popup ВСЕ БРЕНДЫ

			// показать попап
			brandsCntButton.addEventListener('click', () => {
				popupAllBrands.classList.add('active');
				bodyFixPosition();
			});

 
		}

	// страница САЛОНЫ
		if(document.querySelector('.salons')) {

			// слайдер с названием города
			let salonsCity = new Swiper('.salons-slider__city', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 'auto',
				// slidesPerView: 'auto',
				spaceBetween: 20,

				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
				
			});

			//сладйер с фотографиями салона
			let salonsPhotoSlider = new Swiper('.salons-address__descr-slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				breakpoints: {
					// when window width is >= 320px
					320: {
					  slidesPerView: 1,
					  spaceBetween: 20
					},
					// when window width is >= 480px
					600: {
					  slidesPerView: 2,
					  spaceBetween: 20
					},
					// when window width is >= 640px
					900: {
					  slidesPerView: 3,
					  spaceBetween: 20
					}
				},

				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				
			});

			//при клике на город, делает его активным
				let salonsSliderCitySlide = document.querySelectorAll('.js_salons_slider_city_slide');//слайд с названием города
				let salonsAddressWrap = document.querySelectorAll('.js_salons_address_wrap');//блок с адресами салонов
				

				//при клике на город, делает его активным
					salonsSliderCitySlide.forEach(elem => {
						elem.addEventListener('click', () => {
							salonsSliderCitySlide.forEach(elem => {
								elem.classList.remove('active');
							});
							elem.classList.add('active');
							
							// определяет название города и делает активным список адресов в этом городе
							let activeCity = elem.dataset.city;//активный город

							salonsAddressWrap.forEach(elem => {

								if(elem.dataset.city == activeCity) {
									salonsAddressWrap.forEach(elem => {	
											elem.classList.remove('active');
									});

									elem.classList.add('active');

									let salonsAddressItem = elem.querySelectorAll('.js_salons_address_item');//строка с адресом
									let salonsAddressDescr = elem.querySelectorAll('.js_salons_address_descr_block');//блок с картой и слайдером

									//делает активным нужный адрес и описание с картой
										salonsAddressItem.forEach((address, index) => {

											address.addEventListener('click', () => {

												console.log(index);
												//удаляет активный класс со всех эелементов строки
												salonsAddressItem.forEach(elem => {
													elem.classList.remove('active');
													elem.classList.remove('none-border');
												});

												//убирает бордер у предыдущего элемента
												if(index > 0) {
													salonsAddressItem[index - 1].classList.add('none-border');
												}

												//удаляет активный класс со всех блоков с описанием
												salonsAddressDescr.forEach(elem => {
													elem.classList.remove('active');
												});

												//делает активным блок сописанием
												salonsAddressDescr[index].classList.add('active');


												
												address.classList.add('active');//делает активным строку с адресом
											});
										});

								}
							});
						});
					});




		}

	// страница ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ
		if(document.querySelector('.terms')) {

			let btn = document.querySelector('.terms__button');//кнопка смотреть далее
		
			// ПРИ КЛИКЕ НА КНОПКУ 'СМОТРЕТЬ ДАЛЕЕ' НА СТРАНИЦЕ ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ ОТКРЫВАЮТСЯ/СКРЫВАЮТСЯ ДОПОЛНИТЕЛЬНЫЕ БЛОКИ НА МОБИЛКЕ
			btn.onclick = function (e) {
				let element = document.querySelector(".terms__text-block");
				if (element.classList.contains("show-block")) {
					element.classList.remove("show-block");
				} else {
					element.classList.add("show-block");
				}
			}
		} 

	// страница РЕГИCТРАЦИЯ
		if(document.querySelector('.registration')) {

			let registrationFormGroupTel = document.querySelector('.js_registration_form_group_tel');//input с номерром телефона

			registrationFormGroupTel.addEventListener("input", mask, false);
			registrationFormGroupTel.addEventListener("focus", mask, false);
			registrationFormGroupTel.addEventListener("blur", mask, false); 
		
		
		}

	//popup ПРИМЕРИТЬ ОНЛАЙН
		if(document.querySelector('.js_product_popup_video')) {
			let productPopupVideo = document.querySelector('.js_product_popup_video');//попап видео
			let productPopupVideoContent = document.querySelector('.js_product_popup_video_content');//контентная часть модального окна

			let productPopupVideoContentClose = document.querySelector('.js_product_popup_video_content_close');//кнопка закрыть "Х" в попап видео
			let productDescrButtonAdd = document.querySelector('.js_product_descr_button_add')//кнопка ДОБАВИТЬ В КОРЗИНУ

 			// закрытие popup ПРИМЕРИТЬ ОНЛАЙН при клике на Х
				productPopupVideoContentClose.addEventListener('click', () => {
					productPopupVideo.classList.remove('active');
					bodyUnfixPosition();
				});

				productPopupVideo.addEventListener('click', () => {
					productPopupVideo.classList.remove('active');
					bodyUnfixPosition();
				});

				productPopupVideoContent.addEventListener('click', (e) => {
					e.stopPropagation();
				});

				productDescrButtonAdd.addEventListener('click', () => {
					productPopupVideo.classList.remove('active');
					bodyUnfixPosition();
				});
		}

	// popup ТАБЛИЦА РАЗМЕРОВ
		if(document.querySelector('.js_product_popup_size')) {

			let productPopupSize = document.querySelector('.js_product_popup_size');//popup ТАБЛИЦА РАЗМЕРОВ
			let productPopupSizeWrap = document.querySelector('.js_product_popup_size_wrap');//обертка
			let productPopupSizeClose = document.querySelector('.js_product_popup_size_close');//кнопка закрыть Х

			// закрыть popup
			productPopupSizeClose.addEventListener('click', () => {
				productPopupSize.classList.remove('active');
				bodyUnfixPosition();
			});

			productPopupSize.addEventListener('click', () => {
				productPopupSize.classList.remove('active');
				bodyUnfixPosition();
			});

			productPopupSizeWrap.addEventListener('click', (e) => {
				e.stopPropagation();
			});

		}

	// popup ВЫБОР МАГАЗИНА
		if(document.querySelector('.js_product_popup_magazine')) {

			let productPopupMagazine = document.querySelector('.js_product_popup_magazine');//popup ВЫБОР  МАГАЗИНА
			let productPopupMagazineContent = document.querySelector('.js_product_popup_magazine_content');//контент попапа ВЫБОР  МАГАЗИНА
			let productPopupMagazineClose = document.querySelector('.js_product_popup_magazine_close');//кнопка закрыть Х

			// закрыть popup ВЫБОР МАГАЗИНА
			productPopupMagazineClose.addEventListener('click', () => {
				productPopupMagazine.classList.remove('active');
				bodyUnfixPosition();
			});

			productPopupMagazine.addEventListener('click', () => {
				productPopupMagazine.classList.remove('active');
				bodyUnfixPosition();
			});

			productPopupMagazineContent.addEventListener('click', (e) => {
				e.stopPropagation();
			});



		}

	// popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
		if(document.querySelector('.popup-product-add')) {

			let popupProductAddSlider = new Swiper('.popup-product-add__slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				slidesPerView: 3,
			  

				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},

			  });

			let popupProductAdd = document.querySelector('.js_popup_product_add');//popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
			let popupProductAddWrap = document.querySelector('.js_popup_product_add_wrap');//контент popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
			let productAddClose = document.querySelector('.js_product_add_close');//кнопка закрыть Х
			let popupProductAddButtonProceed = document.querySelector('.js_popup_product_add_button_proceed');//кнопка продолжить покупки
			let popupProductAddButtonArrange = document.querySelector('.js_popup_product_add_button_arrange');//кнопка оформит заказ

			// закрытие popup ТОВАР ДОБАВЛЕН В КОРЗИНУ
			productAddClose.addEventListener('click', () => {
				popupProductAdd.classList.remove('active');
				bodyUnfixPosition();
			});
			popupProductAdd.addEventListener('click', () => {
				popupProductAdd.classList.remove('active');
				bodyUnfixPosition();
			});
			popupProductAddWrap.addEventListener('click', (e) => {
				e.stopPropagation();
			});
			popupProductAddButtonProceed.addEventListener('click', () => {
				popupProductAdd.classList.remove('active');
				bodyUnfixPosition();
			});

		}

	// popup ДОБАВИТЬ АДРЕС
		if(document.querySelector('.js_popup_add_address')) {

			let popupAddAddress = document.querySelector('.js_popup_add_address');//popup ДОБАВИТЬ АДРЕС
			let popupAddAddressContent = popupAddAddress.querySelector('.js_popup_add_address_content');//контентная часть popup ДОБАВИТЬ АДРЕС
			let popupAddAddressClose = document.querySelector('.js_popup_add_address_close');//закрыть popup ДОБАВИТЬ АДРЕС

			popupAddAddress.addEventListener('click', () => {
				popupAddAddress.classList.remove('active');
				bodyUnfixPosition();
			});

			popupAddAddressContent.addEventListener('click', (e) => {
				e.stopPropagation();
			});

			popupAddAddressClose.addEventListener('click', () => {
				popupAddAddress.classList.remove('active');
				bodyUnfixPosition();
			});
		}

	// popup ВСЕ БРЕНДЫ
		if(document.querySelector('.js_popup_all_brands')) {
			let popupAllBrands = document.querySelector('.js_popup_all_brands');//popup ВСЕ БРЕНДЫ
			let popupAllBrandsCnt = document.querySelector('.js_popup_all_brands_cnt');//контент попапа ВСЕ БРЕНДЫ
			let popupAllBrandsCntClose = document.querySelector('.js_popup_all_brands_cnt_close');//кнопка закрыть Х попап
			let popupAllBrandsCntListItem = document.querySelectorAll('.js_popup_all_brands_cnt_list_item');//ссылки на бренды

			// закрыть при клике на Х
			popupAllBrandsCntClose.addEventListener('click', () => {
				popupAllBrands.classList.remove('active');
				bodyUnfixPosition();
			});
			// закрыть при клике на серый фон
			popupAllBrands.addEventListener('click', () => {
				popupAllBrands.classList.remove('active');
				bodyUnfixPosition();
			});
			popupAllBrandsCnt.addEventListener('click', (e) => {
				e.stopPropagation();
			});
			//приклике на ссылку
			popupAllBrandsCntListItem.forEach(elem => {
				elem.addEventListener('click', () => {
					popupAllBrands.classList.remove('active');
					bodyUnfixPosition();
					document.location.href = "page-catalog.html";
				});
			});


		}

	// popup ВЫБОР РАЗМЕРА
		if(document.querySelector('.js_popup_choice_size')) {
			let popupChoiceSize = document.querySelector('.js_popup_choice_size');//popup ВЫБОР РАЗМЕРА
			let popupChoiceSizeWrap = document.querySelector('.js_popup_choice_size_wrap');//контентная часть
			let popupChoiceSizeClose = document.querySelector('.js_popup_choice_size_close');//закрыть popup при клике на Х
			let popupChoiceSizeListItem = document.querySelectorAll('.js_popup_choice_size_list_item');//размеры которые можно выбрать
			let popupProductAdd = document.querySelector('.js_popup_product_add');//popup ТОВАР ДОБАВЛЕН В КОРЗИНУ

			// выбор одного размера
			popupChoiceSizeListItem.forEach(elem => {
				elem.addEventListener('click', () => {

					// убрать все  активные размеры
					popupChoiceSizeListItem.forEach(elem => {
						elem.classList.remove('active');
					});

					elem.classList.add('active');
				});
			});

			popupChoiceSizeClose.addEventListener('click', () => {
				popupChoiceSize.classList.remove('active');//закрыть выбор размера
				popupProductAdd.classList.add('active');//открыть добавить в магазин

			});

			popupChoiceSize.addEventListener('click', () => {
				popupChoiceSize.classList.remove('active');
				popupProductAdd.classList.add('active');//открыть добавить в магазин
			});

			popupChoiceSizeWrap.addEventListener('click', (e) => {
				e.stopPropagation();
			});
		}

	// ФУНКЦИИ-------------------------------------------------------------------
	// 1. Фиксация <body>
	function bodyFixPosition() {

		setTimeout( function() {
		/* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */
	
		if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
	
			// Получаем позицию прокрутки
			let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
	
			// Ставим нужные стили
			document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.top = '-' + scrollPosition + 'px';
			document.body.style.left = '0';
			document.body.style.width = '100%';
	
		}
	
		}, 15 ); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */
	
	}
  
	// 2. Расфиксация <body>
	function bodyUnfixPosition() {
	
		if ( document.body.hasAttribute('data-body-scroll-fix') ) {
	
		// Получаем позицию прокрутки из атрибута
		let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
	
		// Удаляем атрибут
		document.body.removeAttribute('data-body-scroll-fix');
	
		// Удаляем ненужные стили
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.width = '';
	
		// Прокручиваем страницу на полученное из атрибута значение
		window.scroll(0, scrollPosition);
	
		}
	
	}

	// маска для ввода номера телфона
		function setCursorPosition(pos, elem) {
			elem.focus();
			if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
			else if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select()
			}
		}
		
		function mask(event) {
			var matrix = "+7 (___) ___-__-__",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			if (def.length >= val.length) val = def;
			this.value = matrix.replace(/./g, function(a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
			});
			if (event.type == "blur") {
				if (this.value.length == 2) this.value = ""
			} else setCursorPosition(this.value.length, this)
		};

		// пример как использовать маску для ввода номера телфона
			// var input = document.querySelector("#news-tel-user");

			// if (input) {
			// 	input.addEventListener("input", mask, false);
			// 	input.addEventListener("focus", mask, false);
			// 	input.addEventListener("blur", mask, false); 

			// }


			

		

});


let delivery = $("#delivery");
let terms__block = $("#terms__block");
let deliveryH = delivery.innerHeight();

$(window).on("scroll", function () {
	let scrollTop = $(this).scrollTop();
	// console.log(scrollTop);

	if (scrollTop >= deliveryH) {
		terms__block.addClass("block-content--fixed");
	} else {
		terms__block.removeClass("block-content--fixed");
	}
});


