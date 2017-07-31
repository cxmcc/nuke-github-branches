RELEASE=release.zip
SOURCES=icon.png icon48.png manifest.json $(JS_FILES) $(HTML_FILES)
JS_FILES=jquery-3.2.0.min.js content.js
HTML_FILES=popup.html

all: $(RELEASE)

$(RELEASE): $(SOURCES)
	zip $(RELEASE) $(SOURCES)

clean:
	rm -f $(RELEASE)
