#!/usr/bin/perl -w

use strict;
use XML::Parser;


my $numErrors = 0;
my %personTable = ();
my $curTemplate;
my $curInflection;


sub error
{
    my ($msg) = @_;

    print "$0: ERROR: $msg\n";
    $numErrors++;
}


sub handleStart
{
    my ($expat, $el, %attr) = @_;

    if ($el eq "template")
    {
	$curTemplate = $attr{name};
	if (!defined $curTemplate)
	{
	    error("<template> element without a 'name' attribute");
	}
    }
    elsif ($el eq "p")
    {
	%personTable = ();
    }
    elsif ($el eq "i")
    {
	$curInflection = "";
    }
}


sub handleChar
{
    my ($expat, $str) = @_;

    if (defined $curInflection)
    {
	$curInflection .= $str;
    }
}


sub handleEnd
{
    my ($expat, $el) = @_;

    if ($el eq "i")
    {
	die unless defined $curInflection;
	if (defined $personTable{$curInflection})
	{
	    error("person in template $curTemplate has duplicate inflections ($curInflection)");
	}
	$personTable{$curInflection} = 1;
	$curInflection = undef;
    }
}


###############################################################################

my $workDir = shift;
chdir($workDir) if defined $workDir;

my $parser = new XML::Parser(Handlers => {
		Start => \&handleStart,
		End => \&handleEnd,
		Char => \&handleChar,
		});
$parser->parsefile("conjugation-fr.xml");

exit($numErrors > 0);
