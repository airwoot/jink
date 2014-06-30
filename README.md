# Jink Documentation

## Oh!! The Pain Of Nested Tables

Email templating hasn't evolved with the web standards. They are still archaic.
*Nested tables*, *inline css*, major support differences among email clients...

Authoring one is **truly a pain**.

Thanks to the guys at Zurb for [Ink](http://zurb.com/ink/). It takes care of the
client incompatibilties, provide a robust grid system and makes your email templates
responsive. 

But still you got to write your templates in HTML.

But still you got to have a mess with nested tables.

This makes the **authoring slow** and renders the template **unreadable**.

So, I thought, in this modern age of HTML pre-processors, life can be made more easier.

Introducing **Jink = Jade + Ink**

## What's Jink?

**Jink is a workflow**. It is comprised of [Jade](http://jade-lang.com/), 
[Ink](http://zurb.com/ink/), [Sass](http://sass-lang.com/) and 
some [Grunt](http://gruntjs.com/) tasks.

*Jade* is a HTML Template Engine. I used Jade to abstract the unnecessary HTML code
provided by Ink that bloats the template, otherwise.

*Ink* is a responsive email framework that offers you a grid system and other goodies,
so you don't have to bother about structuring the notorious mess of nested tables.
Jink is **thoroughly and truly dependent on Ink.**

*Sass* is a css pre-processor. You do awesome things that then translates to CSS.

*Grunt* is a JS task runner. I use it to watch jade and sass files for compilation.
Then later use it to inline css in the email template.

## How Jade Helps?

Jade has this idea of [mixins](http://jade-lang.com/reference/#mixins).

> Mixins allow you to create reusable blocks of jade.

```
mixin hello
  p Hello!! Monsieur

//- Use the mixin
+hello()
+hello()
```

would compile to this

```
<p>Hello!! Monsieur</p>
<p>Hello!! Monsieur</p>
```

The idea of Jink was born out of the fact that mixin not only helps you to 
reuse jade sections but it **allows to inject any block of code within a section**

```
mixin hello
  p Hello!! Monsieur
  if block
    block
  else
    p I am sorry, I have nothing to say

//- use the mixin
+hello()
+hello()
  //- this is the block being passed to the mixin
  p Paris looks beautiful in rain
```

would compile to 

```
<p>Hello!! Monsieur</p>
<p>I am sorry, I have nothing to say</p>

<p>Hello!! Monsieur</p>
<p>Paris looks beautiful in rain</p>
```

And this is what enabled me to abstract the nested structures of rows and columns
in a grid .

A typical Ink grid consist of a row and then column(s) inside it.

It looks like

```
<table class="row">
  <tr>
    <td class="wrapper">

      <table class="eight columns">
        <tr>
          <td>

            Eight Columns

          </td>
          <td class="expander"></td>
        </tr>
      </table>

    </td>
    <td class="wrapper last">

      <table class="four columns">
        <tr>
          <td>

            Four Columns

          </td>
          <td class="expander"></td>
        </tr>
      </table>

    </td>
  </tr>
</table>
```

With Jink, you just have write this

```
+row()
  +columns('eight')
    td Eight Columns
  +columns('four', 'last')
    td Four Columns
```

This helps in quick authoring and maintain the readability of the template.

## Documentation

Jink is just an abstraction over Ink. It does not add any new capabilities to
Ink. **It just makes it easier to author email templates in Ink**. And provides
a workflow to get you a template thats **deploy ready**.

**NOTE: Before using Jink, you must know go through the [docs of Ink](http://zurb.com/ink/docs.php).
Jink uses the same helper classes as Ink. You also must understand how to author
in [Jade](http://jade-lang.com/reference).**

### Grid
 
> #### Structure
>
> Ink uses a 12-column grid with a 580px wrapper. On mobile devices 
> (under 580px wide), columns become full width and stack vertically.
>
> Ink's grid can be thought of in terms of three components:
>
> ##### Containers
> 
> Ink containers wrap the content and maintain a fixed, 580px layout on large 
> displays. Below 580px, containers take up 95% of the screen's width,ensuring 
> that your content doesn't run right up against the edges of the user's screen.
>
> ##### Rows
>
> Rows are used to separate blocks of content vertically. 
> In addition to the vertical separation, the `<td>` tags of .row tables use 
> the wrapper class to maintain a gutter between columns. Note: the last .wrapper 
> `<td>`in a row MUST have a class of .last applied to it, even if it's the only 
> wrapper in the row (ex. for a row with a single, twelve-column wide content area).
>
> ##### Columns
> 
> Columns denote the width of the content, as based on a 12-column system. 
> The content inside them will expand to cover n-columns, assuming that the 
> number of columns in one row adds up to 12.

Jink have mixins for `container`, `row` and `column`.

#### Containers

```
+container()(class="template-wrapper")
  // Rest of the email template
```

Passing the attribute list to the mixin is optional.

If you pass an attribute `class`, it uses the value of the attribute 
to add a class to the enclosing `<table class="container">`

#### Row

```
+row()(class="template-wrapper")
```

Passing the attribute list to the mixin is optional.

If you pass an attribute `class`, it uses the value of the attribute 
to add a class to the enclosing `<table class="row">`

#### Columns

```
+columns({number}, {wrapperClass})

```

`number` denotes the number of columns

`wrapperClass` denotes classes that should be added to the `<table class="wrapper">`
that wraps a column.

For example,

```
+columns('twelve', 'last')
```

#### A Simple Example

Here is a simple example of how a two column email template would like in Jade.

```
+container(class="template-wrapper")
  +row()
    +columns('eight')
      td This is eight columns wide.
    +columns('four', 'last')
      td This is four columns and the last one in the row
```

And you got a complete email here, albeit suffering from existensial problems.

#### Centered Content

> To center the content of a column, apply a class of center to the `<td>` that 
> contains the content. If you want to center an image, you should also apply 
> a class of center to the image itself. For maximum client support, we also 
> recommend using the HTML `<center>` tag around the content you wish to center.

```
+columns('twelve', last)
  td.center
    p Only the dead have seen the end of war.
  td.center
    img.center(src="http://bukk.it/acid.jpg")
```

#### Offset Columns

Add `offset-by-number` to the wrapper around the column

```
+columns('four')
+column('six', 'last offset-by-two')
```

#### Text Padding

> A fairly common use case for the container is to give your text a white 
> background to separate it from a colored email body. To assist with this 
> design pattern, we've included three helper classes with Ink: `.text-pad`, 
> `.left-text-pad` and `.right-text-pad`.

> The `.text-pad` class provides 10px of padding on either side of the content 
> (while it's named text-pad, it works just as well on buttons or images), 
> making sure it doesn't butt right up against the edge of your container. 
> The `.text-pad` class should be applied to the `<td>` of a `.columns <table>`.

> The `.left-text-pad` and `.right-text-pad` do the same thing as the `.text-pad` 
> class, but are meant to be applied to content that doesn't extend across the 
> entire row (in other words, content that isn't twelve columns wide). 
> The directional text-padding classes only apply the padding to the side of 
> the content near the edge of the container on large screens, but apply it to 
> both sides on small screens, when the columns expand to fill the full width 
> of the row.

```
+columns('six')
  td.text-pad
    p He that can have patience can have what he will.
```

#### Full Width Rows

> When working with designs that call for a container that's colored to stand
> out from the background (like the example above), it can often be helpful 
> to have full-width rows that can be styled separately, especially for 
> elements like headers or ad breaks.

```
//- ordinary row
+row()
  +columns(twelve, last)
//- full width row, no need to mention columns
//- I already did that in the mixin
+fullWidthRow()
  td This is a full width row. This extends to the email window.
```

### Sub Grid

> A non-stacking grid for even more versatile layouts

> Ink does provide a nestable sub-grid for when one grid just isn't enough.

Sub Grids are nested columns inside columns. They don't stack on mobile.

To have sub-columns in Jink, add class, `.sub-columns` and the `number-class`
to the `td` inside the column

```
+row()
  +columns('eight')
    td.sub-columns.eight 
      p We are all born ignorant, but one must work hard to remain stupid.
    td.sub-columns.four.last
      p Well done is better than well said.
```

Like the columns, add the class `last` to the last column of the row.

### Block Grid

> An even-width element grid that doesn't use media queries.

> For cases where neither the Ink grid nor the Ink sub-grid is appropriate, 
> the block-grid can often be quite useful. Block-grid elements automatically 
> align to the left and are pushed down to the next row individually as the 
> viewport gets smaller...all without using media queries.

Pass a number to the block grid column mixin to describe how many even-sized elements
should be placed per row. 

```
+container()
  +blockGrid(two)
    td Half Truth
    td Half Lie
```

### Visibility Classes

> Selectively show content for different screen sizes.

Add a visibility attribute to the column mixin.

To show only show on a small device, pass the value, `show-for-small`

To hide on a small-device, pass the value, `hide-for-small`

```
+row()
  +column('twelve', 'last')(visibility="show-for-small")
    td This is will be shown in small devices
  +column('twelve', 'last')(visibility="show-for-small")
    td This is will be hidden in small devices
```

### Panel

> Add a class of panel to a `<td>` in a .columns table in order to give it a 
> default border and background color. 

> Great for offsetting important content or for quickly prototyping a layout.

```
+row()
  +columns('twelve', 'last')
    td.panel
      By failing to prepare, you are preparing to fail.
```

### Buttons

> Buttons expand to the full width of their container by default, 
> so if you don't want them to expand all the way, 
> consider placing them in a sub-grid or block-grid element.

Just pass the text into the button mixin to create a button.

```
+row()
  +column('three')
    +button('Submit')
```

Jade provides different helper style classes to decorate your buttons.

##### Size

-  `.button` (same as .small-button)
-  `.tiny-button`
-  `.small-button`
-  `.medium-button`
-  `.large-button`

##### Color

-  none (same as .primary)
-  `.primary`
-  `.secondary`
-  `.alert`
-  `.success`

##### Border Radius

-  none (no border-radius)
-  `.radius`
-  `.round`

Pass in a space seperated list of this style class with attribute `style` to
the button mixin

```
+button("Say Hello")(style="medium-button alert round")
```

And that will do.

## Folder Structure

-  `src` - Author all your Jink files inside this folder.

-  `build` - All jade files are compiled to HTML inside this folder

-  `dist` - All HTML files with inlined CSS are compiled to this folder

-  `sass` - Author all your sass files here

-  `stylesheets` - All sass files are compiled here

## Grunt Taks

-  `default` - Run `grunt` inside the root directory, to watch `.jade` files
    inside the `src` directory and `sass` files inside the `sass`
    directory. 

    It will automatically convert the `jade` and `sass` files
    into HTML and CSS and place them in `dist` and `stylesheets` directory 
    respectively.

    It also opens up a local server serving the files in your directories.

-  `inline` - inlines the css rules present in the associated stylesheets. It uses
              a grunt plugin version of [Premailer](http://premailer.dialect.ca/)

## Workflow

I assume you have [node](http://nodejs.org/), [bower](http://bower.io/), and 
[grunt](http://gruntjs.com/) installed.

Run `npm install`, `bower install`.

Run `grunt` from the root directory.

Author your .jade files inside the `src` directory.

After finishing the authoring, run `grunt inline`.

The files in the `dist` are now ready for distribution.

## Examples

I created two example email templates with Jink. This should help you get 
started.

**The first one is a single layout template.**

This is how it looks in desktop email clients.

![One-Column-Desktop-Email-Clients](https://db.tt/BHI6rGms)

This is how it looks in mobile email clients

![One-Column-Mobile-Email-Clients](https://db.tt/PUaOuSeT)

Aaand this is how to make it in Jink

```
extends ../src/includes/layout

block body
  +container()(class="example-wrapper")
    
    +row()
      +columns('twelve', 'last image-wrapper')
        td.center
          img.center(src="https://db.tt/INvt3MHn")

    +row()
      
      +columns('eight')
        td.text-pad
          p.message
            | Airwoot, a startup that helps brands provide customer support on 
            | social media. Airwoot has built a next generation real-time customer 
            | support using the sophisticated filtering and priority engine 
            | that separates social chatter from relevant support queries.

    +row()(class="button-wrapper")
      +columns ('six', 'last')
        td.text-pad
          +button("Learn More")(style="large-button radius")
```

**The second one is a two column layout template.**

This is how it looks in desktop email clients.

![One-Column-Desktop-Email-Clients](https://db.tt/fE2RRiGS)

This is how it looks in mobile email clients

![One-Column-Mobile-Email-Clients](https://db.tt/PUaOuSeT)

Aaand this is how to make it in Jink

```
extends ../src/includes/layout

block body
  +container()(class="example-wrapper")
    
    +row()
      +columns('twelve', 'last image-wrapper')
        td.center
          img.center(src="https://db.tt/INvt3MHn")

    +row()
      
      +columns('six')
        td.text-pad
          p.example-two.message
            | Airwoot, a startup that helps brands provide customer support on 
            | social media. Airwoot has built a next generation real-time customer 
            | support using the sophisticated filtering and priority engine 
            | that separates social chatter from relevant support queries.

      +columns('five', 'last quote-wrapper')
        td.text-pad.panel.quote
          p 
            | The next-gen customers are highly opinionated, always on the go
            | and ever connected. Through social media they can reach out to 
            | a brand anytime, anywhere.

    +row()(class="button-wrapper")
      +columns ('six', 'last')
        td.text-pad
          +button("Learn More")(style="large-button radius")
```

*For the user's benefit, I have included these example files in the repo. Enjoy.*

## Warning

> Since Gmail doesn't support media queries, 
> users will be presented with the desktop view. 
> If mobile Gmail is a large part of your audience, 
> we'd suggest using a layout based on the block-grid.

## Further Resources

-  [**How To Code HTML Emails** by *Mailchimp*](http://kb.mailchimp.com/article/how-to-code-html-emails/)
-  [**The Ultimate Guide to CSS** by *Campaign Monitor*](https://www.campaignmonitor.com/css/)

## TODOS

-  Add more higher level Jade Mixins
-  Add further resources to enhance HTML Email

## License
MIT 
Copyright 2014 Airwoot































