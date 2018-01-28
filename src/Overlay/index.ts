

interface ICompOverlayBgProps {
    opacity?: number,
    bg?: string,
}

export class CompOverlayBg extends Comp<ICompOverlayBgProps, {}, any> {

    tpl(h, p, s, m, T, css) {
        return h('div', {
                style: {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 1e4,
                }
            },
            h('div', {
                style: {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    backgroundColor: p.bg || '#000',
                    opacity: p.opacity || 0.8,
                    // boxShadow: 'inset 0 0 200px #000',
                },
            }, '.'),
            h('div', {
                style: {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }
            },
                p.children
            )
        );
    }
}


interface ICompOverlayProps {
    title?: string,
    component: any,
    opacity?: number,
    padding?: number|string,
    onClose?: () => void,
    onBgClick?: () => void,
}
export class CompOverlay extends Comp<ICompOverlayProps, {}, any> {

    onmount() {
        document.body.addEventListener('keydown', this.onDocKeydown);

        // Make window non-scrollable.
        // let st = document.body.style;
        // st.overflow = 'hidden';
        // st.position = 'absolute';
    }

    onunmount() {
        document.body.removeEventListener('keydown', this.onDocKeydown);

        // Make window scroll again.
        // let st = document.body.style;
        // st.overflow = 'hidden';
        // st.position = 'static';
    }

    onDocKeydown = e => {
        if(e.key === 'Escape') {
            let {onClose} = this.props;
            if(onClose) onClose();
        }
    };

    tpl(h, p, s, m, T, css) {
        var padding = typeof p.padding === 'undefined' ? 40 : p.padding;

        return h(CompOverlayBg, p,
            h('div', {
                style: {
                    position: 'relative',
                    // flex: '1 1 auto',
                    backgroundColor: '#fff',
                    borderRadius: css.theme.bdRad,
                    boxShadow: '0 0 200px rgba(0,0,0,0.5), 0 3px 5px rgba(0,0,0,0.6)',
                    overflow: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                },
                // onScroll: e => {
                //     e.preventDefault();
                // }
            },
                h('div', {
                        style: {
                            padding,
                        },
                    },
                    p.component
                ),
                h('div', {
                    className: 'unselectable',
                    style: {
                        width: '85%',
                        position: 'absolute',
                        fontSize: css.scale(0.9) + 'px',
                        fontWeight: 300,
                        top: 20,
                        left: 20,
                        color: css.theme.color.grey,
                    }
                }, p.title),
                h('div', {style: {position:'absolute', top:8, right:8}},
                    h(CompBtnClose, {onClick: p.onClose, style: {background:'none'}}),
                )
                // h('a', {
                //     style: {
                //         cursor: 'pointer',
                //         display: 'block',
                //         position: 'absolute',
                //         top: 0,
                //         right: 0,
                //         width: 16,
                //         height: 16,
                //         padding: 18,
                //     },
                //     onClick: p.onClose,
                // },
                //     h(CompIcon16Close)
                // )
            )
        );
    }
}
