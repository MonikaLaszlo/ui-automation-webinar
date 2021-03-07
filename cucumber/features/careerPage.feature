Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Search for a <Position> job in <Country>/<City>
  Given I open the career page
  Then the logo should be visible
  And the search form should be visible

  #When I select the location <Country> and <City> in the location filter box
  #Then <City> should be selected in the location filter box

  #When I select the skill <Skill> in the skills filter box
  #Then <Skill> should be selected in the skills filter box

  When I click on the find button and select <Country> country <City> city <Skill> skill
  Then should have proper position
  And the skill of the position should be <Skill>
  And the location of the position should be <City>
  And the apply link should be visible

  When I click on the apply link
  Then the description of the position should contain the location <City>
  And the description of the position should contain <Position> position
  And should have mandatory fields
  And should have submit button

  Examples:
    | Country     | City         | Skill                     | Position
    | Hungary     | Debrecen     | Software Test Engineering | Test Automation Engineering
    | Netherlands | Hoofddorp    | Software Architecture     | Storage Solution Architect