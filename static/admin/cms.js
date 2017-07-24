var siteHeaderPart = h('div', {'className': 'site-header'},
    h('div', {'className': 'container'},
        h('div', {'className': 'site-header__top'},
            h('span', {'className': 'site-header__brand'},
                h('img', {'src': '/dist/site-brand.png', 'width': '250', 'height': '44'})
            )
        )
    )
);

var siteFooterPart = h('div', {'className': 'site-footer'},
    h('div', {'className': 'container'},
        h('div', {'className': 'site-footer__bottom'},
            h('img', {'src': '/dist/site-brand-invert.png', 'className': 'site-footer__logo', 'width': '188', 'height': '33'})
        )
    )
);

var pageHeaderPart = function (text) {
    return h('div', {'className': 'page-header'},
        h('h1', {'className': 'page-header__title'},
            h('span', {}, text)
        )
    );
}

var heroBannerPart = function (image, heading, description) {
    return h('div', { 'className': 'banner' },
        h('div', { 'className': 'banner__overlay' },
            h('div', { 'className': 'container' },
                h('h2', { 'className': 'banner__heading' }, heading),
                h('p', { 'className': 'banner__description' }, description)
            )
        ),
        h('img', { 'className': 'banner__image', 'src': image })
    )
}

var PagePreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var heroImage = entry.getIn(['data', 'hero_image_1750']);

        return h('div', {},
            siteHeaderPart,
            heroImage ? null : pageHeaderPart(entry.getIn(['data', 'title'])),
            heroImage ? heroBannerPart(
                this.props.getAsset(heroImage).toString(),
                entry.getIn(['data', 'hero_heading']),
                entry.getIn(['data', 'hero_subheading'])
            ) : null,
            h('div', {'className': 'section'},
                h('div', {'className': 'container'},
                    this.props.widgetFor('body')
                )
            ),
            siteFooterPart,
            h('div', {'className': 'search-index'}, 
                h('p', {'className': 'search-index__title'},
                    (entry.getIn(['data', 'seo_title']) ? entry.getIn(['data', 'seo_title']) : entry.getIn(['data', 'title'])) + ' | Distinctly PR'
                ),
                h('p', {'className': 'search-index__description'},
                    entry.getIn(['data', 'description']) ? entry.getIn(['data', 'description']) : '...'
                )
            )
        );
    }
});

CMS.registerPreviewStyle('cms.css');
CMS.registerPreviewTemplate('page', PagePreview);
