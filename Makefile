RELEASE=release.zip
SOURCES=icon.png manifest.json $(JS_FILES)
JS_FILES=jquery-3.2.0.min.js content.js

all: $(RELEASE)

$(RELEASE):
	zip $(RELEASE) $(SOURCES)

clean:
	rm -f $(RELEASE)
