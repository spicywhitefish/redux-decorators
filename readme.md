# Spicy Redux Decorators

An OK syntax for working with Redux using decorators in TypeScript.  Currently limited to Angular 2 but could potentially be used elsewhere.

<a href="http://plnkr.co/edit/mhZNwlkrpo7k4rzEQaOr?p=preview" target="_blank">Try a live example on plunkr</a>

# Installation

```
npm i spicy-redux-decorators
```

# Example Usage (Angular 2)

**app.reducer.ts**
```js
import {InitialState, Reducer} from 'redux-decorators';

@InitialState({
    count: 0
})
@Reducer('add', 'remove')
export class AppReducer {
    add(state) { return { count: state.count + 1 }; }
    remove(state) { return { count: state.count - 1 }; }
}
```
In the above example we create a new class that will hold our action
reducers.  We then register two action reducers with the `@Reducer('add', 'remove')` decorator.  Anytime an `add` or `remove` action is dispatched the
corresponding method will be called on the `AppReducer` class, allowing the
method to update the state for that particular action.

**count.component.ts**
```js
import {Component} from 'angular2/core';
import {Store} from 'redux-decorators';

@Component({
    selector: 'counter',
    template: `
        <div>Count: {{count}}</div>
        <button (click)="dispatch('add')">Add</button>
        <button (click)="dispatch('remove')">Remove</button>
    `
})

@Store('count')
export class CounterComponent {}
```

In the above example we used the `@Store()` decorator to register the
`CounterComponent` as a store observer.  We also registered the `count` property
with the store which means that any changes to the `count` property in the application
state will be automatically pushed through to the `count` property of this
component.

Notice also the `dispatch()` method in the template.  This method is
 provided by the `@Store()` decorator and can be used to easily dispatch an action.

**boot.ts**
```js
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import './app.reducer';

bootstrap(AppComponent);
```

In the above example we imported the `app.reducer` as a side-effect only
module - that's all we need to do.

# API

## Decorators

### @InitialState(state)

The `@InitialState` decorator is used for setting the initial state of the
application store.

This decorator accepts a single object `state` that describes the initial state of the application.

```js
@InitialState({
    count: 0
})
```

### @Reducer([actionReducer1, actionReducer2, ...])

The `Reducer()` decorator is used to identify a root reducer, however it can also
be used as a convenience method for setting multiple action reducers in a single call.

The `@Reducer()` decorator registers a new root reducer if the class you are
decorating contains a reducer method.

**Root Reducer**
```js
@Reducer()
class MyRootReducer implements IReducer {
    reducer(state = initialState, action) {
       ...
    }
}
```

In the above example, the `MyRootReducer` class contains a `reducer` method,
this means that this `class` will be registered as the root reducer - this will
overwrite the default root reducer and prevent action reducers from working out
of the box.

**Action Reducers**  
We can mark individual methods as action reducers.
```js
class MyReducers {
    @Reducer() add(state): { return { count: state.count + 1; } }
    @Reducer() remove(state): { return { count: state.count - 1; } }
}
```

Alternatively we can mark multiple methods at once using `@Reducer()`:

```js
@Reducer('add', 'remove')
class MyReducers {
    add(state): { return { count: state.count + 1; } }
    remove(state): { return { count: state.count - 1; } }
}
```

### @Store([stateProp1, stateProp2, ...])

The `@Store()` decorator is used to identify a store component.  A store component
is automatically subscribed to the application store and receives registered
state updates when the store is updated.

```js
@Store()
class TodoListComponent {
   ...
}
```

You'll also need to declare which properties are updated by the application store.
You can do that by explicitly decorating each property with the `@State()` decorator,
or you can declare these properties when you declare the `@Store()` decorator:

```js
@Store('todos')
class TodoListComponent {
   ...
}
```

In the above example we are declaring that the `todos` property of the
`TodoListComponent` should be automatically updated whenever the application
store's `todos` property is changed.

### @State()

The `@State()` decorator is used to identify a state property in the application
 store.  Identifying state properties allow the property to be automatically
 updated when the application store's property changes.

```js
@Store()
class TodoListComponent {
   @State() todos:Todo[] = [];
   ...
}
```

In the above example we are declaring that the `todos` property of the
`TodoListComponent` should be automatically updated whenever the application
store's `todos` property is changed.  Please also refer to the `@Store()`
equivalent.


### @Subscribe()

The `@Subscribe()` decorator is used to register a state listener to the global
 store. 

**todo.service.ts**
```js
class TodoService {
   @Subscribe() stateChange(state) {
   // Did todos change?
    //Persist Todos
   ...
}
```

In the above example we are declaring that the `stateChange` method of the
`TodoListService` should be called every time the state changes. Note that 
`@Store` is not required.

```js
@Store('todos')
class TodoListComponent {
   @Subscribe() stateChange(state) {
   // Did todos change?
    //Persist Todos
   ...
}
```

In the above example we are declaring that the `stateChange` method of the
`TodoListComponent` should be called every time the state changes. `@Store`
will handle subscribing and unsub

# TODO

1. Tests

# License

MIT
