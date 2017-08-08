== README - Notes ==

POSTCSS
Styling in the build in enabled by using POSTCSS and targeting various browser by criteria
see https://github.com/ai/browserslist for more information

  browsers: [
    'last 2 versions',
    '> 2%',
    'ie 8-11',
    'firefox > 40',
    'safari > 5',
    'opera > 30',
    'ios 6-7',
    'android 4'
  ]


Bugs / Decisions / Design
=============================================================================

[] Scrolling
   Cannot use
   fixed:, top:0, bottom:0, left:0, right:0

   for the overlay as this prevents scrolling when the page is below the fold
   (should pages be allowed to be this BIG ?????)

[] Language Switcher
   provide a language switcher / drop down on the page

[] BACKGROUND IMAGE
   html => having the backgroun image is wrong

[] FORM LAYOUT
   form need to have a min an dmax width that makes it centre

[] CENTERING
   Inputs need to have LEFT Align
   Labels need Left Align

[] Typography
   Build the text style heirarchy to make rendering look OK

[] Radio-Group / Radio Button
   define

[] Text Input
    define

[] Number Input
   define  - add the input "{/d}" references so hat phones and pads select the right format

[] Settings
   load a users 'active' settings into the page componentWillMount() componantHasMounted()

