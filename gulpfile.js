const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const sass = require('gulp-sass');
//const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const cleancss = require('gulp-clean-css'); // [css] CSS壓縮
const del = require('del');
const babel = require('gulp-babel'); // [JS] 轉換ES6為ES5，將ES6語法轉換成瀏覽器能讀的ES5
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps'); // [檔案追蹤] 來源編譯
const jshint = require('gulp-jshint'); // [JS] JS檢查錯誤\
const changed = require('gulp-changed'); // [例外處理] 找出哪些檔是被修改過的
const rename = require('gulp-rename'); // 檔案重新命名
const uglify = require('gulp-uglify'); // [JS] 壓縮JS
const notify = require('gulp-notify'); // 通知訊息
const gulpIgnore = require('gulp-ignore'); // [例外處理] 無視指定檔案
const autoprefixer = require('gulp-autoprefixer'); // [css] CSS自動前綴
const imagemin = require('gulp-imagemin'); // [IMG] Image壓縮
const imageminGifsicle = require('imagemin-gifsicle'); // [IMG] GIF壓縮
const imageminJpegRecompress = require('imagemin-jpeg-recompress'); // [IMG] JPG壓縮
const pug = require('gulp-pug'); // [HTML / PUG] 編譯 PUG（PUG模板）
const iconfont = require('gulp-iconfont'); // [ICON FONT] 編譯font檔案
const consolidate = require('gulp-consolidate'); // [ICON FONT] 編譯Demo html + icon.scss
const async = require('async'); // [ICON FONT] 編譯Demo html + icon.scss
const jeditor = require("gulp-json-editor"); //處理json
sass.compiler = require('node-sass');

const fontName = 'icon';				// set name of your symbol font
const fontClassName = 'be-icon';		// Class Name 可依專案名稱修改，建議不要取"icon"單字，CSS編寫上容易衝突
const className = 's';
const nowTime = new Date().getTime();

gulp.task('browserSync', function (done) {
    browsersync.init({
        open:false,
        server: {
            baseDir: "dist/"
        },
        port: 3000
    });
    done();

})
gulp.task('browserSyncReload', function (done) {
    browsersync.reload();
    done();

})

function copyData(){
    return(
        gulp.src('src/data/*.json')    
        .pipe(plumber())
        // .pipe(jeditor({
        //     'version': '1.2.3'
        //   }))
        .pipe(gulp.dest('dist/data'))
        .pipe(browsersync.stream())
        .pipe(notify('copyData task Compressed!'))
    )




}
function iconFont(){
    return(
        gulp.src(['src/images/font_svg/*.svg'], {base: './src/'})
		.pipe(changed('src/images/font_svg/*.svg',{
			extension: '.svg',
			hasChanged: changed.compareLastModifiedTime
		}))
		.pipe(iconfont({
            fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			appendCodepoints: true,
			appendUnicode: false,
			normalize: true,
			fontHeight: 1000,
			centerHorizontally: true
		}))
		.on('glyphs', function (glyphs,options) {
            
            // const options = {
            //     className,
            //     fontName,
            //     fontPath: 'dist/fonts/icons',
            //     fontDate: nowTime,
            //     cssClass: fontClassName,
            //     glyphs: glyphs.map(mapGlyphs)
                
            // }
            gulp.src('src/sass/vendor/font/templates/_icons.scss')
            .pipe(consolidate('underscore',  {
                glyphs: glyphs,
                fontName: options.fontName,							// 使用的font-family
                fontPath: '../fonts/icons/',						// 生成的SCSS讀取font檔案讀取位置
                fontDate: nowTime,									// 避免有快取問題
                cssClass: fontClassName								// 使用的class名稱: <i class="{{fontClassName}} {{fontClassName}}-{{svg file name}}"></i>
            }))
            .pipe(gulp.dest('src/sass/vendor/font'));

            // 生成 ICON CSS (Demo HTML使用)
            gulp.src('src/sass/vendor/font/templates/_icons.scss')
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: options.fontName,
                fontPath: '',
                fontDate: nowTime,
                cssClass: fontClassName
            }))
            .pipe(rename({basename: "icons", extname: '.css'}))
            .pipe(gulp.dest('dist/fonts/icons'))	
            
            // 生成 Demo CSS (Demo HTML使用)
			gulp.src('src/sass/vendor/font/templates/_iconfont-demo.scss')
				.pipe(rename({basename: "iconfont-demo", extname: '.css'}))
                .pipe(gulp.dest('dist/fonts/icons'))
            
            			// 生成Demo HTML
			gulp.src('src/sass/vendor/font/templates/_index.html')
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: options.fontName,
                cssClass: fontClassName,
                fontYYYY: new Date().getYear() + 1900
            }))
            .pipe(rename({basename: 'index'}))
            .pipe(gulp.dest('dist/fonts/icons'));    
        })
        .pipe(gulp.dest('dist/fonts/icons/'))	
        .pipe(browsersync.stream())
        .pipe(notify('Iconfont task Compressed!'))
    )
}

function mapGlyphs (glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
  }

function styles(){
    return(    
        gulp.src('src/sass/**/*.+(scss|sass|css)')
    .pipe(sourcemaps.init())    
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 11', 'ios 8', 'android 4'))
    .pipe(plumber())
    .pipe(gulp.dest('dist/css'))
    
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss({ rebase: false }))
    .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'src/sass'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream())
    .pipe(notify('CSS Task Complete!'))
    )
}   

function jsBuild(){
    return(
        gulp.src([
            'src/js/*.js',
            // '!src/js/es6/*.js',
            '!src/js/vendor/*.*',
            '!src/js/**/_*.js',
            '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*.*',            
            ])
            .pipe(babel({
                presets: ['@babel/env']
            })) 
            .pipe(plumber())   
            .pipe(jshint())
            .pipe(gulpIgnore.exclude('src/js/*.min.js','vendor/**/*.*'))
            .pipe(gulp.dest('dist/js'))
            .pipe(changed('dist/js/**/*.js'))            
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .pipe(browsersync.stream())
            .pipe(notify('jsBuild Task Complete!'))

    )
}
function jsVendor(){
    return(
        gulp.src([
            'src/js/{vendor,lib,plugin,plugins,foundation}/*.js',
            '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*.min.js',
            '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*-min.js'
        ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(plumber())
		.pipe(jshint())
		.pipe(changed('dist/js/**/*.js'))
        // Minify
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
		.pipe(browsersync.stream())
		.pipe(notify('jsVendor Task Complete!'))
    )

}
function jsOnlyCopy(){
    return(
        gulp.src([
            'src/js/{vendor,lib,plugin,plugins,foundation}/**/*.min.js',
            'src/js/{vendor,lib,plugin,plugins,foundation}/**/*-min.js'
        ])
		.pipe(plumber())
		.pipe(jshint())
		.pipe(changed('dist/js/**/*.js'))
        .pipe(gulp.dest('dist/js'))
		.pipe(browsersync.stream())
		.pipe(notify('jsOnlyCopy Task Complete!'))

    )

}

function picBuild(){
    return gulp.src('src/images/**/*')
    .pipe(plumber())
    .pipe(changed('dist/images/*',{
        hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imageminJpegRecompress({
            quality: 'veryhigh',
            progressive: true,
            max: 80,/* 符合google speed 範疇 */
            min: 60
        }),        
    ]))
    .pipe(gulp.dest('dist/images'))
    .pipe(browsersync.stream())
    //.pipe(notify('picBuild task Compressed!'))

}
function buildPage(){
    return gulp.src(['src/*.pug' , '!src/_*.pug'])
    //.pipe(plumber())
    .pipe(pug({
        pretty: true,
        compileDebug: true
	  }))
	.pipe(gulp.dest('dist'))
    .pipe(browsersync.stream())
	.pipe(notify('HTML / PUG Task Complete!'));

}

gulp.task('watchFile', function () {

    gulp.watch('src/sass/**/*.*', styles);
    gulp.watch('src/js/*.js', jsBuild);
    gulp.watch('src/js/**/*.js', jsVendor);
    gulp.watch('src/js/**/*.js', jsOnlyCopy);
    gulp.watch('src/images/**/*', picBuild);
    gulp.watch('src/**/*.pug', buildPage);
    gulp.watch('src/images/font_svg/*.svg', iconFont);
    gulp.watch('src/sass/vendor/font/templates/_icons.scss', iconFont);
    gulp.watch('src/data/*.json', copyData);
   

});

gulp.task('clean', function (done) {
    return del(['dist/'], done);
});



gulp.task('default', gulp.series('clean' , gulp.parallel(jsBuild,jsVendor,jsOnlyCopy,picBuild,buildPage,styles,iconFont,copyData,'browserSync'), 'watchFile'));
gulp.task('serve', gulp.series('watchFile'));

