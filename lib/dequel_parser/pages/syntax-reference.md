# Syntax Reference

The Dequel syntax was designed to have a low barrier of entry, mimicking common search patterns in various UIs. 
For more complex use-cases it lends itself syntactic features from CSS and takes inspiration from functional languages.

## Reserved Words

Since we cannot make assumptions about field-names that are queried, there are
no reserved words for querying.

## Field Match

The base form of a field match is `<field-name>:<value>`.
Whitespace around the comparator `:` is ignored.
So these queries are equivalent: 

```dequel
foo: "some bar"

foo : "some bar"

foo:
    "some bar"
```

### Field Names

Field-names are expected to follow the common requirement for DB column names:

- Must contain only letters (a-z, A-Z), numbers (0-9), or underscores ( _ )
- Must begin with a letter or underscore.

### Values

#### Strings

Strings are written using double quotes: `"a string value"`.
A single word can be written without strings, meaning `name:ada`

